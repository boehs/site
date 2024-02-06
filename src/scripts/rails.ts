const decode = (msg, rails) => {
    const fen = fence(msg.length, rails);
    const dec = Array(msg.length);
    msg.split("").forEach((c, i) => (dec[fen[i]] = c));
    return dec.join("");
};
function fence(length, rails) {
    const cycle_len = 2 * rails - 2;
    return Array.from({ length: rails }).flatMap((_, r) =>
        Array.from({ length }, (_, i) => i).filter(
            (i) => i % cycle_len === r || i % cycle_len === cycle_len - r,
        ),
    );
}
document.querySelectorAll(".rails").forEach((row) => {
    row.textContent = decode(row.textContent, row.getAttribute("n"));
    row.href = decode(row.href, row.getAttribute("n"));
});
