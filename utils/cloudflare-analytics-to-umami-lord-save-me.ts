import { randomUUID } from "crypto";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

type dimensions = {
    countryName: string;
    datetimeMinute: string;
    deviceType: string;
    refererHost: string;
    refererPath: string;
    requestHost: string;
    requestPath: string;
    userAgentBrowser: string;
    userAgentOS: string;
};

let output: {
    data: {
        viewer: {
            accounts: {
                rumPageloadEventsAdaptiveGroups: {
                    avg: {
                        sampleInterval: number;
                    };
                    count: number;
                    dimensions: dimensions;
                    sum: {
                        visits: number;
                    };
                }[];
            }[];
        };
    };
} = JSON.parse(``);
let w = output.data.viewer.accounts[0].rumPageloadEventsAdaptiveGroups;

let aLittleMoreSane: {
    session: dimensions;
    numberOfSessions: number;
    uuid?: string;
    events: {
        numberOfPagesPerSession: number;
        eventDef: dimensions;
    }[];
}[] = [];

w = w.filter((point) => {
    if (point.sum.visits > 0) {
        aLittleMoreSane.push({
            session: point.dimensions,
            numberOfSessions: point.sum.visits,
            events: [
                {
                    numberOfPagesPerSession: point.count / point.sum.visits,
                    eventDef: point.dimensions,
                },
            ],
        });
        return false;
    }
    return true;
});

w.forEach((point) => {
    let possible = aLittleMoreSane.find(
        (b) =>
            b.session.userAgentBrowser == point.dimensions.userAgentBrowser &&
            b.session.deviceType == point.dimensions.deviceType &&
            point.dimensions.countryName == b.session.countryName,
    );
    if (possible != undefined) {
        possible.events.push({
            numberOfPagesPerSession: 1,
            eventDef: point.dimensions,
        });
    } else {
        aLittleMoreSane.push({
            session: point.dimensions,
            numberOfSessions: point.count,
            events: [
                {
                    numberOfPagesPerSession: 1,
                    eventDef: point.dimensions,
                },
            ],
        });
    }
});

console.log(
    aLittleMoreSane.reduce((a, b) => {
        return a + b.numberOfSessions;
    }, 0),
);
console.log(
    aLittleMoreSane.reduce((a, b) => {
        let n = b.events.reduce((c, d) => c + d.numberOfPagesPerSession, 0);
        return a + n * b.numberOfSessions;
    }, 0),
);
aLittleMoreSane.forEach((wa) => {
    wa.session.userAgentOS = wa.session.userAgentOS
        .replace("MacOSX", "Mac OS")
        .replace("Windows", "Windows 10")
        .replace("Android", "Android OS");
    wa.session.userAgentBrowser = wa.session.userAgentBrowser
        .replace("SamsungInternet", "samsung")
        .replace("Mobile", "")
        .toLowerCase();
});

let finished = aLittleMoreSane.flatMap((row) => {
    return (
        Array(row.numberOfSessions).fill(row) as typeof aLittleMoreSane
    ).map((r2) => {
        r2.uuid = randomUUID();
        return JSON.parse(JSON.stringify(r2));
    });
});

const dialect = new PostgresDialect({
    pool: new Pool({
        database: "",
        host: "",
        user: "",
        password: "",
        port: 1,
        max: 10,
    }),
});

interface Database {
    website_event: WebsiteEvent;
    session: Session;
}

interface Session {
    session_id: string;
    website_id: string;
    hostname: string;
    browser: string;
    os: string;
    device: string;
    screen: string;
    language: string;
    country: string;
    subdivision1: string;
    subdivision2: string;
    city: string;
    created_at: string;
}

interface WebsiteEvent {
    event_id: string;
    website_id: string;
    session_id: string;
    created_at: string;
    url_path: string;
    url_query: string;
    referrer_path: string;
    referrer_query: string;
    referrer_domain: string;
    page_title: string;
    event_type: number;
    event_name: string;
}

const db = new Kysely<Database>({
    dialect,
});

await db.transaction().execute(async (trx) => {
    await trx
        .insertInto("session")
        .values(
            finished.map((r) => {
                return {
                    session_id: r.uuid!,
                    website_id: "",
                    hostname: r.session.requestHost,
                    browser: r.session.userAgentBrowser,
                    screen: "1x1",
                    os: r.session.userAgentOS,
                    device: r.session.deviceType,
                    language: "en-US",
                    country: r.session.countryName,
                    subdivision1: "",
                    subdivision2: "",
                    city: "",
                    created_at: r.session.datetimeMinute,
                };
            }),
        )
        .execute();

    await trx
        .insertInto("website_event")
        .values(
            finished.flatMap((r) => {
                return r.events
                    .flatMap((row) => {
                        return Array(row.numberOfPagesPerSession).fill(
                            row,
                        ) as (typeof row)[];
                    })
                    .flatMap((row) => {
                        let ret: WebsiteEvent = {
                            event_id: randomUUID(),
                            session_id: r.uuid!,
                            website_id: "",
                            created_at: row.eventDef.datetimeMinute,
                            url_path: row.eventDef.requestPath,
                            url_query: "",
                            referrer_path: row.eventDef.refererPath,
                            referrer_query: "",
                            referrer_domain: row.eventDef.refererHost,
                            page_title: "Imported From Cloudflare",
                            event_type: 1,
                            event_name: "",
                        };
                        return ret;
                    });
            }),
        )
        .execute();
});
