function handleNavItemClick(event) {
   event.preventDefault();

   const link = event.target;
   const targetSectionId = link.getAttribute("href").substring(1);
   const targetSection = document.getElementById(targetSectionId);

   document.querySelectorAll("section").forEach((section) => {
      section.style.display = "none";
   });

   if (targetSection) {
      targetSection.style.display = "block";
   }

   document.querySelectorAll("nav ul li a").forEach((navLink) => {
      navLink.classList.remove("active");
   });
   link.classList.add("active");

   if (targetSectionId === "chatbot") {
      document.getElementById("chat-input").focus();
   }
}

document.addEventListener("DOMContentLoaded", () => {
   const sections = document.querySelectorAll("section");
   sections.forEach((section, index) => {
      section.style.display = index === 0 ? "block" : "none";
   });

   const navLinks = document.querySelectorAll("nav ul li a");
   if (navLinks.length > 0) {
      navLinks[0].classList.add("active");
   }

   navLinks.forEach((link) => {
      link.addEventListener("click", handleNavItemClick);
   });

   if (typeof updateNavItems === "function") {
      updateNavItems();
   }
});

document.addEventListener("DOMContentLoaded", () => {
   const fullscreenMap = document.getElementById("fullscreen-map");
   const homePage = document.getElementById("home-page");
   const closeMapButton = document.getElementById("close-map");

   const openFullscreenMap = () => {
      fullscreenMap.style.display = "block";
      homePage.classList.add("hidden");
   };

   const closeFullscreenMap = () => {
      fullscreenMap.style.display = "none";
      homePage.classList.remove("hidden");
   };

   document
      .getElementById("map-section")
      .addEventListener("click", openFullscreenMap);

   closeMapButton.addEventListener("click", closeFullscreenMap);
});

document.addEventListener("DOMContentLoaded", function () {
   if (typeof ol !== "undefined") {
      const map = new ol.Map({
         target: "map",
         layers: [
            new ol.layer.Tile({
               source: new ol.source.OSM(),
            }),
         ],
         view: new ol.View({
            center: ol.proj.fromLonLat([9.375, 47.4322]),
            zoom: 19,
         }),
      });

      const locations = [
         {
            coordinates: [9.3747, 47.43233],
            description:
               "Felice Varini | 'Dix disques évidés plus neuf moitiés et deux quarts', 2014",
         },
         {
            coordinates: [9.3753, 47.4326],
            description: "Gerhard Richter | 'St.Gallen', 1989, 680cm x 250cm",
         },
         {
            coordinates: [9.375, 47.4325],
            description: "Enzo Cucchi | 'Ohne Titel', 1988, 18,8m x 3,4m",
         },
      ];

      const vectorSource = new ol.source.Vector();
      locations.forEach((location) => {
         const marker = new ol.Feature({
            geometry: new ol.geom.Point(
               ol.proj.fromLonLat(location.coordinates)
            ),
            description: location.description,
         });
         marker.setStyle(
            new ol.style.Style({
               image: new ol.style.Icon({
                  anchor: [0.5, 1],
                  src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg",
                  scale: 2,
               }),
            })
         );
         vectorSource.addFeature(marker);
      });
      const markerLayer = new ol.layer.Vector({
         source: vectorSource,
      });
      map.addLayer(markerLayer);

      const popup = new ol.Overlay({
         element: document.getElementById("popup"),
         autoPan: true,
         autoPanAnimation: { duration: 250 },
      });
      map.addOverlay(popup);

      const popupContent = document.getElementById("popup-content");
      const popupCloser = document.getElementById("popup-closer");

      popupCloser.onclick = function () {
         popup.setPosition(undefined);
         popupCloser.blur();
         return false;
      };

      map.on("singleclick", function (event) {
         map.forEachFeatureAtPixel(event.pixel, function (feature) {
            const description = feature.get("description");
            if (description) {
               const coordinates = feature.getGeometry().getCoordinates();
               popupContent.innerHTML = description;
               popup.setPosition(coordinates);
            }
         });
      });
   } else {
      console.error("OpenLayers library failed to load.");
   }
});
