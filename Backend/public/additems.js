// $(document).ready(addItems);
// // $(document).ready(sendData);



// function addItems() {
//     $("button").click(function () {
//         var t = document.createElement("input");
//         t.setAttribute("name", "item");
//         t.setAttribute("placeholder", "item");
//         $(this).parent('div').append(t);
//     });
//     document.querySelector('.click').addEventListener('click', get_bf);



//     function get_bf(evt) {
//         var bf_items = [];
//         var ln_items = [];
//         var dn_items = [];


//         var a = document.querySelectorAll('.breakfast input');
//         for (let i = 0; i < a.length; i += 1) {
//             var f = a[i].value;
//             bf_items.push(f);
//            }
//         var b = document.querySelectorAll('.lunch input');
//         for (let i = 0; i < b.length; i += 1) {
//             var f = b[i].value;
//             ln_items.push(f);
//         }
//         var c = document.querySelectorAll('.dinner input');
//         for (let i = 0; i < c.length; i += 1) {
//             var f = c[i].value;
//             dn_items.push(f);
//         }
//         z = document.getElementById("myselect").selectedIndex;
//         y = document.getElementById('myselect').options;
//         days = [];
//         day = { day: y[z].value, breakfast:bf_items,lunch: ln_items, dinner:dn_items }
//         console.log(day)
//         days.push(day);
//         console.log("from days array", days);
//         console.log('from days array populating', days[0]);

//         $("button").click(function () {
//             $.ajax({
//                 type: "post",
//                 url: "/insertplan",
//                 dataType: 'json',
//                 data: JSON.stringify(day),
//                 contentType: 'application/json',
//                 // success: function (data) {
//                 //     console.log("from ajax", data)
//                 //     return data;
//                 // }

//             });
//         });


//         // document.querySelector('.send').addEventListener('click',sendData);
//         // console.log("hello");

//     }
// }
