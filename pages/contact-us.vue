<script lang="ts" setup>
const contactPage = await useContactUsPageStore().getContent();
const title = useGetTextFieldValue(contactPage, "_pagebase__page_title");
const subtitle = useGetTextFieldValue(
  contactPage,
  "_pagebase__page_description"
);
const latitude = useGetTextFieldValue(contactPage, "address_latitude");
const longitude = useGetTextFieldValue(contactPage, "address_longitude");

onMounted(() => {
  var L = window.L;
  var mymap = L.map("mapid").setView([latitude, longitude, 13], 13);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 18,
      attribution: "",
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(mymap);

  L.marker([latitude, longitude, 13])
    .addTo(mymap)
    .bindPopup("<b>Runner Shop </b> <br />Location.")
    .openPopup();

  mymap.scrollWheelZoom.disable();
  mymap.touchZoom.disable();
});
</script>

<template>
  <component
    is="link"
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""
  ></component>
  <div class="container-fluid bg-light py-5">
    <div class="col-md-6 m-auto text-center">
      <h1 class="h1">{{ title }}</h1>
      <p>
        {{ subtitle }}
      </p>
    </div>
  </div>
  <div id="mapid" style="width: 100%; height: 300px"></div>
  <component
    is="script"
    src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""
  ></component>
  <!-- Start Contact -->
  <div class="container py-5">
    <div class="row py-5">
      <form class="col-md-9 m-auto" method="post" role="form">
        <div class="row">
          <div class="form-group col-md-6 mb-3">
            <label for="inputname">Name</label>
            <input
              type="text"
              class="form-control mt-1"
              id="name"
              name="name"
              placeholder="Name"
            />
          </div>
          <div class="form-group col-md-6 mb-3">
            <label for="inputemail">Email</label>
            <input
              type="email"
              class="form-control mt-1"
              id="email"
              name="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="inputsubject">Subject</label>
          <input
            type="text"
            class="form-control mt-1"
            id="subject"
            name="subject"
            placeholder="Subject"
          />
        </div>
        <div class="mb-3">
          <label for="inputmessage">Message</label>
          <textarea
            class="form-control mt-1"
            id="message"
            name="message"
            placeholder="Message"
            rows="8"
          ></textarea>
        </div>
        <div class="row">
          <div class="col text-end mt-2">
            <button type="submit" class="btn btn-success btn-lg px-3">
              Let’s Talk
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- End Contact -->
</template>
