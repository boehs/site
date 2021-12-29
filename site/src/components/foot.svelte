<script>
    import { onMount } from "svelte";
    async function main() {
        let rawModules = {};
        let content = import.meta.glob("./flowers/*.txt");
        for (const path in content) {
            rawModules[path] = await import(`${path}?raw`);
        }
        let flowers = Object.values(rawModules)
            .map((x) => x.default)
            .reverse();

        const mstime = readable(new Date().getTime(), (set) => {
            let animationFrame;
            const next = () => {
                set(new Date().getTime());
                animationFrame = requestAnimationFrame(next);
            };
            if (window.requestAnimationFrame) {
                next();
                return () => cancelAnimationFrame(animationFrame);
            }
        });

        let start;
        onMount(() => {
            start = new Date().getTime();
        });

        $: time = Math.floor(($mstime - start) / 100);
    }
    main();
</script>

<pre />

<style>
    pre {
        color: rgb(10 160 110 / 25%);
    }
</style>
