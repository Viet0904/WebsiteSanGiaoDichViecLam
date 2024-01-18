//
// Tìm phần tử cha của Element
function getParent(element, selector) {
  if (element.matches(".mtb")) {
    return element;
  }
  while (element) {
    if (!element.parentElement) {
      return null;
    }
    if (element.parentElement.matches(selector)) {
      return element.parentElement;
    }
    element = element.parentElement;
  }
}
// Xử lí sự kiện khi click vào thẻ input thêm checked
function handlecheck(parentElement) {
  var inputElement = parentElement.querySelector("input");

  if (inputElement.checked == true) {
    inputElement.checked = false;
  } else {
    inputElement.checked = true;
  }
}
function handleInput(ele) {
  if (ele.classList.contains("imChecked")) {
    ele.classList.remove("imChecked");
    ele.setAttribute("checked", false);
  } else {
    ele.setAttribute("checked", true);
    ele.classList.add("imChecked");
  }
}
// Hàm jquery xủ7 lí sự kiện click trực tiếp vào thẻ input radio
// bật tắt checked radio
function handleInput(value) {
  $(document).on("click", value, function () {
    thisRadio = $(this);
    if (thisRadio.hasClass("imChecked")) {
      thisRadio.removeClass("imChecked");
      thisRadio.prop("checked", false);
    } else {
      thisRadio.prop("checked", true);
      thisRadio.addClass("imChecked");
    }
  });
}
handleInput("input[name='postdate']");

// lắng nghe sự kiện click
document.addEventListener("click", function (e) {
  if (e.target.tagName.toLowerCase() === "input") {
  } else {
    let parentInput = getParent(e.target, ".mtb");
    if (parentInput) {
      handlecheck(parentInput);
    }
  }
});
var buttonJob = document.getElementById("btn_filter_job");
// xử lí khi click vào nút lọc
buttonJob.addEventListener("click", function () {
  let inputNodelist = document.querySelectorAll("input");
  let inputChecked = Array.from(inputNodelist).filter(function (input) {
    if (input.checked == true) {
      return input;
    }
  });
  if (inputChecked.length !== 0) {
    switch (Number(inputChecked[0].value)) {
      case 0: {
        window.location.href = "./congviec_page1.html";
        break;
      }
      case 1: {
        window.location.href = "./dichvutaichinh.html";
        break;
      }
      case 2: {
        window.location.href = "./truyenthong.html";
        break;
      }
      case 3: {
        window.location.href = "./hangtieudungvabanle.html";
        break;
      }
      case 4: {
        window.location.href = "./khachsanvadulich.html";
        break;
      }
      case 5: {
        window.location.href = "./kythuat_congnghe.html";
        break;
      }
      case 6: {
        window.location.href = "./xaydung.html";
        break;
      }
      case 7: {
        window.location.href = "./vantai.html";
        break;
      }
      case 8: {
        window.location.href = "./dichvu.html";
        break;
      }
      case 9: {
        window.location.href = "./giaodichkhachhang.html";
        break;
      }
      case 10: {
        window.location.href = "./bophanhotro.html";
        break;
      }
      case 11: {
        window.location.href = "./kythuat.html";
        break;
      }
      case 12: {
        window.location.href = "./yte.html";
        break;
      }
      case 13: {
        window.location.href = "./sanxuat.html";
        break;
      }
      case 14: {
        window.location.href = "./hotrosanxuat.html";
        break;
      }
      case 15: {
        window.location.href = "./nhansu.html";
        break;
      }
      case 16: {
        window.location.href = "./kinhdoanh.html";
        break;
      }
      case 17: {
        window.location.href = "./phiendich.html";
        break;
      }
    }
  } else {
    window.location.reload();
  }
});

// xử lí khi click vào bỏ lọc
var btn_unfilter_job = document.getElementById("btn_unfilter_job");
btn_unfilter_job.addEventListener("click", function () {
  let inputNodelist = document.querySelectorAll("input");
  let inputChecked = Array.from(inputNodelist).filter(function (input) {
    if (input.checked == true) {
      return input;
    }
  });
  if (inputChecked.length !== 0) {
    inputChecked[0].checked = false;
  }
  window.location.href= "./congviec_page1.html";
});
// xử lí khi click vào select sort_day
var sort_day = document.getElementById("sort_day");
var loading_cv = document.getElementById("loading_cv");
sort_day.addEventListener("change", function () {
  let html;
  if (sort_day.value === "1") {
    html = `
    <option value="1">Ngày đăng cũ nhất</option>
    <option value="0">Ngày đăng mới nhất</option>
   `;
    loading_cv.classList.add("loading");
    setTimeout(function () {
      loading_cv.classList.remove("loading");
    }, 1000);
    sort_day.innerHTML = html;
  } else {
    html = `
    <option value="0">Ngày đăng mới nhất</option>
    <option value="1">Ngày đăng cũ nhất</option>
   `;
    loading_cv.classList.add("loading");
    setTimeout(function () {
      loading_cv.classList.remove("loading");
    }, 1000);
    sort_day.innerHTML = html;
  }
});

//Xử lí khi click vào select sort_value
var sort_value = document.getElementById("sort_value");
sort_value.addEventListener("change", function () {
  let html;
  if (sort_value.value === "0") {
    html = ` <option value="0">20 công việc/trang</option>
 <option value="1">50 công việc/trang</option>
 <option value="2">100 công việc/trang</option>
 <option value="3">150 công việc/trang</option>`;
    loading_cv.classList.add("loading");
    setTimeout(function () {
      loading_cv.classList.remove("loading");
    }, 1000);
    sort_value.innerHTML = html;
  }
  if (sort_value.value === "1") {
    html = ` 
    <option value="1">50 công việc/trang</option>
    <option value="0">20 công việc/trang</option>
    <option value="2">100 công việc/trang</option>
    <option value="3">150 công việc/trang</option>`;
    loading_cv.classList.add("loading");
    setTimeout(function () {
      loading_cv.classList.remove("loading");
    }, 1000);
    sort_value.innerHTML = html;
  }
  if (sort_value.value === "2") {
    html = ` 
    <option value="2">100 công việc/trang</option>
    <option value="0">20 công việc/trang</option>
    <option value="1">50 công việc/trang</option>
    <option value="3">150 công việc/trang</option>`;
    loading_cv.classList.add("loading");
    setTimeout(function () {
      loading_cv.classList.remove("loading");
    }, 1000);
    sort_value.innerHTML = html;
  }
  if (sort_value.value === "3") {
    html = ` 
    <option value="4">150 công việc/trang</option>
    <option value="0">20 công việc/trang</option>
    <option value="2">50 công việc/trang</option>
    <option value="3">100 công việc/trang</option>`;
    loading_cv.classList.add("loading");
    setTimeout(function () {
      loading_cv.classList.remove("loading");
    }, 1000);
    sort_value.innerHTML = html;
  }
});
