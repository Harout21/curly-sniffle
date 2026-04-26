const images = import.meta.glob("../images/*.jpeg", {
    eager: true,
});

export const projects = Object.entries(images).map(
    ([path, module], index) => ({
        id: String(index + 1),
        image: (module as any).default || module,
    })
);