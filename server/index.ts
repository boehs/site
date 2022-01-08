import { Application,
  SQLite3Connector, Database, DBModel, DataTypes, Relationships } from "./dep.ts";
import errorMiddleware from "./middleware/error.ts";
import renderMiddleware from "./middleware/render.ts";
import staticMiddleware from "./middleware/serveStatic.ts";
import router from "./routes.ts";

const app = new Application();

let t1;

console.log('Starting server!!')
t1 = performance.now()
app.use(errorMiddleware);
app.use(staticMiddleware);
app.use(renderMiddleware);
app.use(router.routes());


async function run() {
    await app.listen({ port: 6969 });
}

run()
console.log(`Server started in ${Math.floor(performance.now() - t1)}ms. Setting Up DB, This may take a while.`)
t1 = performance.now()

const connector = new SQLite3Connector({
    filepath: './files.sqlite',
  });

const db = new Database(connector);

// Main Table
class Node extends DBModel {
  static table = 'nodes';
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      auautoIncrement: true
    },
    name: DataTypes.STRING,
    updated_at: DataTypes.TIMESTAMP,
    created_at: DataTypes.TIMESTAMP,
    tags: DataTypes.TEXT,
    description: DataTypes.TEXT
  }

  static tags() {
    return this.hasMany(Tag)
  }
}

// Post Tags
class Tag extends DBModel {
  static table = 'tags';
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      auautoIncrement: true
    },
    tag: DataTypes.string(32)
  }

  static nodes() {
    return this.hasMany(Node)
  }
}

const NodeTags = Relationships.manyToMany(Node, Tag);

db.link([Node,Tag,NodeTags])
db.sync({ drop: true })

console.log(`DB Set up in ${Math.floor(performance.now() - t1)}ms`)

export { app };