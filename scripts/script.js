const gallerycontainer = document.querySelector(".gallery");
const galleryitems = gallerycontainer.querySelectorAll(".gallery-item");
const indicator = document.querySelector(".indicator");

const defaultitemflex = "0 1 20px";
const hoveritemflex = "1 1 400px";

const updategalleryitems = () => {
    galleryitems.forEach((item) => {
        let flex = defaultitemflex;

        if (item.isHovered) {
            flex = hoveritemflex;
        }
        item.style.flex = flex;
    });
};

galleryitems[0].isHovered = true;
updategalleryitems();

galleryitems.forEach((item) => {
    item.addEventListener("mousedown", () => {
        galleryitems.forEach((otherItem) => {
            otherItem.isHovered = otherItem === item;
        });
        updategalleryitems();
    });
});

gallerycontainer.addEventListener("mousemove", (e) => {
    indicator.style.left = `${e.clientX - gallerycontainer.getBoundingClientRect().left()

        }px`;
});