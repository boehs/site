export default function (text, separator = "-") {
    if (!text) return "";
    text = text.toString().toLowerCase().trim();

    const sets = [
        { to: "a", from: "[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]" },
        { to: "c", from: "[ÇĆĈČ]" },
        { to: "d", from: "[ÐĎĐÞ]" },
        { to: "e", from: "[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]" },
        { to: "g", from: "[ĜĞĢǴ]" },
        { to: "h", from: "[ĤḦ]" },
        { to: "i", from: "[ÌÍÎÏĨĪĮİỈỊ]" },
        { to: "j", from: "[Ĵ]" },
        { to: "ij", from: "[Ĳ]" },
        { to: "k", from: "[Ķ]" },
        { to: "l", from: "[ĹĻĽŁ]" },
        { to: "m", from: "[Ḿ]" },
        { to: "n", from: "[ÑŃŅŇ]" },
        { to: "o", from: "[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]" },
        { to: "oe", from: "[Œ]" },
        { to: "p", from: "[ṕ]" },
        { to: "r", from: "[ŔŖŘ]" },
        { to: "s", from: "[ßŚŜŞŠ]" },
        { to: "t", from: "[ŢŤ]" },
        { to: "u", from: "[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]" },
        { to: "w", from: "[ẂŴẀẄ]" },
        { to: "x", from: "[ẍ]" },
        { to: "y", from: "[ÝŶŸỲỴỶỸ]" },
        { to: "z", from: "[ŹŻŽ]" },
        { to: "-", from: "[·_,:;']" },
        { to: "", from: "[?]" },
    ];

    sets.forEach((set) => {
        text = text.replace(new RegExp(set.from, "gi"), set.to);
    });

    text = text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/\--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text

    if (typeof separator !== "undefined" && separator !== "-") {
        text = text.replace(/-/g, separator);
    }

    return text.replace(".html", "");
}
