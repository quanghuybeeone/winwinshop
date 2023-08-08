import callApi from './../../controllers/callApi.js';

const renderTotal =async()=>{
    let countProduct = 0
    await callApi('products/ALL', 'GET').then(res=>countProduct+=res.data.products.length)
    // console.log(countProduct);

    let countUser = -1
    await callApi('users/ALL', 'GET').then(res=>countUser+=res.data.users.length)
    // console.log(countUser);

    let countBill = 0
    let listBill
    await callApi('bills/ALL', 'GET').then(res=>{
        countBill+=res.data.bills.length
        listBill=res.data.bills
    }
        
        )
    // console.log(countBill);
    // console.log(listBill);
    let countTotal=0
    if(listBill!=[]){
        listBill.forEach(item => {
            if (item.status == 3) {
                countTotal+=item.total
            }
        });
    }
    // console.log(countTotal);

    document.querySelector('.count-product').innerHTML = countProduct
    document.querySelector('.count-bill').innerHTML = countBill
    document.querySelector('.count-user').innerHTML = countUser
    document.querySelector('.count-total').innerHTML = countTotal.toLocaleString()+'đ'
    renderChart(listBill)
}

const renderChart = (listBill)=>{
    // console.log(listBill);
    let arrData =[]
    let time
    for(let i=1; i<=12;i++){
        let totalInMonth = 0
        if(i<10){
            time = `2023-0${i}-14`
        }else{
            time = `2023-${i}-14`
        }
        // console.log(time);
        listBill.forEach(item=>{
            // console.log(item.createdAt);
            if(time == item.createdAt && item.status==3){
                totalInMonth+=item.total
            }
        })
        // console.log(totalInMonth);
        arrData.push(totalInMonth)
    }
    console.log(arrData);
    //"2023-06-14"
    //"2023-06-14"
    //createdAt
    dashboardChart(arrData)
}

function dashboardChart(arrData){
    "use strict";
  
    feather.replace({ "aria-hidden": "true" });
  
    // Graphs
    const ctx = document.getElementById("myChart");
    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
        datasets: [
          {
            data: arrData,
            lineTension: 0,
            backgroundColor: "transparent",
            borderColor: "#007bff",
            borderWidth: 4,
            pointBackgroundColor: "#007bff",
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            boxPadding: 3,
          },
        },
      },
    });
  }

const dashBoard = ()=>{
    
    renderTotal()

}

export default dashBoard