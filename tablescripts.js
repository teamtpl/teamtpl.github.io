import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA0933aAirSA0jybhbON7NnObJIBjlG4EY",
    authDomain: "team-tpl.firebaseapp.com",
    databaseURL: "https://team-tpl-default-rtdb.firebaseio.com",
    projectId: "team-tpl",
    storageBucket: "team-tpl.appspot.com",
    messagingSenderId: "605603933366",
    appId: "1:605603933366:web:9ef2f16cb317e405024a17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

$(".dt-button").addClass("btn btn-light mx-sm-1 mb-2 rounded-extra shadow-custom");

const dbRef = ref(database);

get(child(dbRef, `User`)).then((snapshot) => {
    if (snapshot.exists()) {
        var vehicles = []
        Object.keys(snapshot.val()).forEach(element => {
            const vehicle = snapshot.val()[element];
            
            vehicle.id = element; // Adding vehicleid as id
                vehicles.push(vehicle);
            
        });
        console.log(vehicles)
        $(document).ready(function () {
            var oTblReport = $("#myTable")

            oTblReport.DataTable({
                dom: '<"top"<"left-col"B><"right-col"f>>rtip',
                buttons: [
                    { extend: 'copy', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
                    { extend: 'csv', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
                    { extend: 'excel', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
                    { extend: 'pdf', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' },
                    { extend: 'print', className: 'btn mx-sm-1 mb-2 rounded-extra shadow-custom' }
                ],
                "data": vehicles,
                "columns": [
                    { data: "Name" },
                    { data: "MobileNumber" },
                    { data: "PoliceStation" },
                    { data: "NatureofDuty" },
                    { data: "AreaAllocated" },
                    { data: "Unit" },
                    { data: "timestamp" },
                    { data: "lat" },
                    { data: "long" }
                    
                ],
                columnDefs: [
                    {
                        targets: [6], // Indexes of timestamp, lat, and long columns
                        render: function (data) {
                            return data ? moment(data).format('Do MMM YYYY h:mm:ss a') : "undefined";
                        }
                    },
                    {
                        targets: [0], // Indexes of Name column
                        render: function (data, type, row) {
                            return data ? '<a href="history.html?vehicle=' + row.id + '">' + data.toUpperCase() + '</a>' : "undefined";
                        }
                    },
                    {
                        targets: [1, 2, 3, 4, 5, 7, 8], // Indexes of MobileNumber, PoliceStation, NatureofDuty, AreaAllocated, and Unit columns
                        render: function (data) {
                            return data ? data : "undefined";
                        }
                    }
                ]
            });
        });

    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});
