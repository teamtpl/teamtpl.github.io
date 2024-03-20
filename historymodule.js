import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref as refdb, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDJSAldp6B4y6dQTEXmwQ-3TnX54jRsLsU",
    authDomain: "patrolling-91471.firebaseapp.com",
    databaseURL: "https://patrolling-91471-default-rtdb.firebaseio.com",
    projectId: "patrolling-91471",
    storageBucket: "patrolling-91471.appspot.com",
    messagingSenderId: "724671694445",
    appId: "1:724671694445:web:ec44063d2524aea192a164"
};

let mapOptions = {
    zoomControl: false,
    zoomSnap: 0.5,
    maxZoom: 15
}


const svgIcon = L.divIcon({
    html: `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block; shape-rendering: auto;" width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" r="0" fill="none" stroke="#f71010" stroke-width="20">
  <animate attributeName="r" repeatCount="indefinite" dur="1.282051282051282s" values="0;30" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
  <animate attributeName="opacity" repeatCount="indefinite" dur="1.282051282051282s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
</circle><circle cx="50" cy="50" r="0" fill="none" stroke="#1b00ff" stroke-width="20">
  <animate attributeName="r" repeatCount="indefinite" dur="1.282051282051282s" values="0;30" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.641025641025641s"></animate>
  <animate attributeName="opacity" repeatCount="indefinite" dur="1.282051282051282s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.641025641025641s"></animate>
</circle>
<!-- [ldio] generated by https://loading.io/ --></svg>`,
    className: "",
    iconSize: [24, 40],
    popupAnchor: [0, -10],
    // iconAnchor: [12, 40],
});

let map = new L.map('map', mapOptions)
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

let layer = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
map.addLayer(layer)


const params = new URLSearchParams(document.location.search);
const s = params.get("vehicle");

$("button").addClass("btn btn-light mx-sm-1 mb-2 rounded-extra shadow-custom");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const database = getDatabase(app);
const db = getDatabase();

var showlive = true;
var markersonchart = [];
var livelatlng = [];

const usersLocation = refdb(db, 'User/' + s);
onValue(usersLocation, (snapshot) => {
    var latlon = []
    const data = snapshot.val();
    console.log(data);
    document.getElementById('Name').innerHTML = data["Name"].toUpperCase();;
    document.getElementById('MobileNumber').innerHTML = data["MobileNumber"];
    document.getElementById('PoliceStation').innerHTML = data["PoliceStation"];
    document.getElementById('NatureofDuty').innerHTML = data["NatureofDuty"];
    document.getElementById('AreaAllocaed').innerHTML = data["AreaAllocaed"];
    document.getElementById('Unit').innerHTML = data["Unit"];
    document.getElementById('Time').innerHTML = moment(data["Time"]).format('Do MMM YYYY h:mm:ss a');
    
    livelatlng = [data["lat"], data["long"]];
    latlon.push([data["lat"], data["long"]])
    if (showlive) {
        markersonchart.forEach(element => {
            map.removeLayer(element)
        });
        var marker = L.marker([data["lat"], data["long"]], { icon: svgIcon }).addTo(map).
            bindPopup("Live")
            .openPopup();
        // .
        // bindPopup("<b>Vehicle Number : </b>" + data["carNumber"] + '<br>' + "<b>Highway Number : </b>" + data["highwayNumber"] + '<br>' + "<b>Phone  : </b>" + data["phoneNumber"] + '<br>' + "<b>Police Incharge Name : </b>" + data["policeInChargeName"] + '<br>' + "<b>Sector Number : </b>" + data["sectorNumber"] + '<br>' + "<b>Time : </b>" + moment(data["time"]).format('Do MMM YYYY h:mm:ss a') + '<br>' + "<b>Zone : </b>" + data["zoneNumber"] + '<br> <a href="history.html?vehicle=' + data["carNumber"] + '">View History</a>')
        // .openPopup();
        var bounds = new L.LatLngBounds(latlon).extend();
        map.fitBounds(bounds);
        markersonchart.push(marker);
    }

    console.log(data);
});

// const usersHistory = refdb(db, 'History/' + s);
// onValue(usersHistory, (snapshot) => {
//     const data = snapshot.val();
//     const jsonArray = Object.values(data);
//     const obj = jsonArray
//     // console.log(obj)
//     $(document).ready(function () {
//         var oTblReport = $("#myTable")

//         oTblReport.DataTable({
//             "pageLength": 50,
//             // dom: "Bfrtip",
//             dom: '<"top"<"left-col"B><"right-col"f>>rtip',
//             buttons: [
//                 { extend: 'copy', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
//                 { extend: 'csv', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
//                 { extend: 'excel', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
//                 { extend: 'pdf', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
//                 { extend: 'print', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
//                 {
//                     text: 'Show Live', className: 'btn mb-2 rounded-extra shadow-custom text-nowrap ml-max',
//                     action: function (e, dt, node, config) {
//                         showlive = true;
//                         markersonchart.forEach(element => {
//                             map.removeLayer(element)
//                         });
//                         var marker = L.marker([livelatlng[0], livelatlng[1]], { icon: svgIcon }).addTo(map).
//                             bindPopup("Live")
//                             .openPopup();
//                         var bounds = new L.LatLngBounds([[livelatlng[0], livelatlng[1]]]).extend();
//                         map.fitBounds(bounds);
//                         markersonchart.push(marker);
//                     }
//                 }
//             ],
//             "data": obj,
//             "columns": [
//                 { data: "timestamp" },
//                 { data: "lat" },
//                 { data: "long" },
//                 {
//                     data: "timestamp", render: function (data, type, row) {
//                         return '<button id="hello" class="btn mx-sm-1 mb-2 rounded-extra shadow-custom"/><i class="fa fa-map"></i>  Show</button>';
//                     }
//                 }
//             ],
//             columnDefs: [{
//                 targets: 0,
//                 render: function (data) {
//                     return moment(data).format('Do MMM YYYY h:mm:ss a');
//                 }
//             }]
//         });
//     });

    // // Get the keys and sort them in descending order
    // const sortedKeys = Object.keys(data).sort((a, b) => b - a);

    // // Loop through the sorted keys to access the corresponding objects
    // sortedKeys.forEach(key => {
    //     const obj = data[key];
    //     // Process obj as needed
    //     console.log(obj);
    // });
// });

$(document).ready(function () {
    var oTblReport = $("#myTable").DataTable({
        "pageLength": 50,
        "order": [[0, "dse"]],
        dom: '<"top"<"left-col"B><"right-col"f>>rtip',
        buttons: [
            { extend: 'copy', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
            { extend: 'csv', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
            { extend: 'excel', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
            { extend: 'pdf', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
            { extend: 'print', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
            {
                text: 'Show Live', className: 'btn mb-2 rounded-extra shadow-custom text-nowrap ml-max',
                action: function (e, dt, node, config) {
                    showlive = true;
                    markersonchart.forEach(element => {
                        map.removeLayer(element)
                    });
                    var marker = L.marker([livelatlng[0], livelatlng[1]], { icon: svgIcon }).addTo(map).
                        bindPopup("Live")
                        .openPopup();
                    var bounds = new L.LatLngBounds([[livelatlng[0], livelatlng[1]]]).extend();
                    map.fitBounds(bounds);
                    markersonchart.push(marker);
                }
            }
        ],
        "columns": [
            { data: "timestamp" },
            { data: "lat" },
            { data: "long" },
            {
                data: "timestamp", render: function (data, type, row) {
                    return '<button id="hello" class="btn mx-sm-1 mb-2 rounded-extra shadow-custom"/><i class="fa fa-map"></i>  Show</button>';
                }
            }
        ],
        columnDefs: [{
            targets: 0,
            render: function (data) {
                return moment(data).format('Do MMM YYYY h:mm:ss a');
            }
        }]
    });

    // Reference to the Firebase Realtime Database
    const usersHistory = refdb(db, 'History/' + s);

    // Listen for changes in the database
    onValue(usersHistory, (snapshot) => {
        const data = snapshot.val();
        const jsonArray = Object.values(data);
        // Clear the existing data in the DataTable
        oTblReport.clear();
        // Add the new data to the DataTable
        oTblReport.rows.add(jsonArray);
        // Redraw the DataTable with the updated data
        oTblReport.draw();
    }, (error) => {
        console.error(error);
    });
});


$(function () {
    $("body").on('click', '#hello', function () {
        markersonchart.forEach(element => {
            map.removeLayer(element)
        });
        var latlon = []
        showlive = false;
        var item = $(this).parent().prev();
        var lng = item.text();
        var lat = item.prev().text();
        var time = item.prev().prev().text();
        console.log(lng, lat, time);
        latlon.push([lat, lng])
        var marker = L.marker([lat, lng], { icon: svgIcon }).addTo(map).bindPopup("<b>Time : </b>" + time).openPopup();
        var bounds = new L.LatLngBounds(latlon).extend();
        map.fitBounds(bounds);
        markersonchart.push(marker);
    });
});

// $('body').on('click', '#hello', function () {
//     var data = $("#myTable").row($(this).parents('tr')).data();
//     alert(data[0] + "'s salary is: " + data[5]);
// });



// function addtotable(id, key, value) {
//     var th = document.createElement('th');
//     th.setAttribute("scope", "row");
//     var text = document.createTextNode(key);
//     th.appendChild(text);

//     var td = document.createElement('td');
//     var text = document.createTextNode(value);
//     td.appendChild(text);

//     var tr = document.createElement('tr');
//     tr.appendChild(th);
//     tr.appendChild(td);

//     document.getElementById(id).appendChild(tr);
// }