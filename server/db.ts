import { SQLite3Connector, Database, DBModel, DataTypes, Relationships } from './dep.ts'
import render from './fetchMd.ts'

const connector = new SQLite3Connector({
  filepath: './files.sqlite',
});

const db = new Database(connector);

// Main Table
export class Node extends DBModel {
  static table = 'nodes';
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      auautoIncrement: true
    },
    name: DataTypes.STRING,
    updated_at: DataTypes.STRING,
    created_at: DataTypes.STRING,
    description: DataTypes.TEXT
  }

  static tags() {
    return this.hasMany(Tag)
  }
}

// Post Tags
export class Tag extends DBModel {
  static table = 'tags';
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      auautoIncrement: true
    },
    name: DataTypes.string(32)
  }

  static nodes() {
    return this.hasMany(Node)
  }
}

export const NodeTags = Relationships.manyToMany(Node, Tag);

Array.prototype.last = function () {
  return this[this.length - 1];
};

export default async function setup(t1: number) {

  db.link([Node, Tag, NodeTags]).sync({ drop: true })

  console.log(`DB Set up in ${Math.floor(performance.now() - t1)}ms.\
 Propagating contents to DB, this might take a bit if you have lots of files.`)

  t1 = performance.now()

  const tags = new Set()
  const files: [{ name: string, updated_at: string, created_at: string, description: string }] | [] = []
  const filesWithTags: [[string, [string]]] | [] = []
  for await (const file of Deno.readDir(`${Deno.cwd()}/md`)) {
    if (file.name.split('.').last() == 'md') {
      const fileinfo = await render(`${Deno.cwd()}/md/${file.name}`)
      if (fileinfo.meta && fileinfo.meta.tags) {
        fileinfo.meta.tags.forEach((element: string) => {
          tags.add(element)
        });
      }
      if (fileinfo.content && fileinfo.birthtime && fileinfo.mtime) {
        files.push({
          name: file.name.split('.')[0],
          updated_at: fileinfo.mtime,
          created_at: fileinfo.birthtime,
          description: fileinfo.content.split('\n')[0]
        })

        if (fileinfo.meta && fileinfo.meta.tags) {
          filesWithTags.push([file.name.split('.')[0], fileinfo.meta.tags])
        }
      }
    }
  }
  Node.create(files)

  let tagObj: [{ tag: string }] | [] = []
  tags.forEach(tag => {
    tagObj.push({ name: tag })
  })
  Tag.create(tagObj)

  // This is very likely not a good way to do this.
  const tagQuery = await (async function () {
    let tagQuery: [any?] = [];
    for (const file of filesWithTags) {
      const FileId = await Node.where('name', file[0]).first()
      for (const tag of file[1]) {
        const TagId = await Tag.where('name', tag).first()
        tagQuery.push({ nodeId: FileId.id, tagId: TagId.id })
      }
    }
    return tagQuery
  })()

  await NodeTags.create(tagQuery)

  console.log(`DB is ready. Took ${Math.floor(performance.now() - t1)}ms.`)

  return { db, Node, Tag }
}