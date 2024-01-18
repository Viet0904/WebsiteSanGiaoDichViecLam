
const btn = document.querySelector(".btn-submit");
const btn_reLoad = document.querySelector(".btn-reload");


imgInp.onchange = evt => {
    const [file] = imgInp.files
    if (file) {
        result.src = URL.createObjectURL(file)
    }
}

btn.addEventListener("click", handleDetail);
function handleDetail() {
    render();
}

function render() {

    let inputs = document.querySelectorAll(".input_handle");
    let arrays = [];
    let emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    // console.log(inputs);
    console.log(typeof emailReg.test(inputs[6].value));
    for (let i = 0; i < inputs.length; ++i) {
        if ( emailReg.test(inputs[6].value) == false) {
            alert('Eamil không đúng hoặc rỗng, vui lòng nhập lại!!');
            return false;
        }
        else if (inputs[i].value.length > 0)  {
            arrays.push(inputs[i].value);
        }
        else {
            alert("Ô điền còn trống !!!, dữ liệu lưu có thể bị lỗi, nên điền đầy đủ thông tin! ")
            return false;
        }
    }
    

    for(let i = 0; i< inputs.length; i++) {
        inputs[i].value = '';
    }

    const htmls = `
    <div class="main">
        <div class="main__header">
            <div class="header-js header-mobile-js">
                <div class="header-profile mt24 mt_rps_12">
                    <div class = "avatar-js">
                        <img class="avatar " src="${result.src}" alt="ảnh hồ sơ của bạn">
                    </div>
                    <h2 class = "header_name-js header_name-tablet-js header_name-mobile-js">${arrays[1]}</h2>
                    <h4 class = "header_position-tablet-js header_position-mobile-js">${arrays[2]}</h4>
                </div>

                <div class="header-profile-info mt24 mt_rps_12">
                    <h2 class = "header_contact-tablet-js header_contact-mobile-js">Thông tin liên hệ</h2>

                    <div class="header-list-info header-list-info-js header-list-info-mobile-js profile-sex text_9px">
                        <i class="header-icon header-icon-js header-icon-mobile-js header-icon-tablet-js fa-solid fa-user"></i>
                        <span class = "list-info-js list-info-mobile-js">${arrays[3]}</span>
                    </div>

                    <div class="header-list-info header-list-info-js header-list-info-mobile-js profile-date text_9px">
                        <i class="header-icon header-icon-js header-icon-mobile-js header-icon-tablet-js fa-solid fa-calendar-days"></i>
                        <span class = "list-info-js list-info-mobile-js">${arrays[4]}</span>
                    </div>

                    <div class="header-list-info header-list-info-js header-list-info-mobile-js profile-phone-number text_9px">
                        <i class="header-icon header-icon-js header-icon-mobile-js header-icon-tablet-js fa-solid fa-phone"></i>
                        <span class = "list-info-js list-info-mobile-js">${arrays[5]}</span>
                    </div>

                    <div class="header-list-info header-list-info-js header-list-info-mobile-js profile-email text_9px">
                        <i class="header-icon header-icon-js header-icon-mobile-js header-icon-tablet-js fa-solid fa-envelope"></i>
                        <span class = "list-info-js list-info-mobile-js">${arrays[6]}</span>
                    </div>

                    <div class="header-list-info header-list-info-js header-list-info-mobile-js profile-address text_9px">
                        <i class="header-icon header-icon-js header-icon-mobile-js header-icon-tablet-js fa-solid fa-location-dot"></i>
                        <span class = "list-info-js list-info-mobile-js">${arrays[7]}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Body -->
        <div class="mt24 main__body-description">
            <div class="col-left text_14px">
                <div class="description__job-goals">
                    <div class="mt24  mb_rps-input-mobile header-flex header__job-goals">
                        <h3 class="header-wrap-right">Mục tiêu nghề nghiệp</h3>
                        <i class="body-icon fa-solid fa-puzzle-piece"></i>
                    </div>

                    <div class="body__job-goals">
                        <i class="fa-solid fa-check" style="font-size: 10px;"></i>
                        <span class = "description-list-item-js description-list-mobile-js description-tablet-js">${arrays[8]}</span>
                    </div>
                </div>

                <div class="description__skill">
                    <div class="mt24  mb_rps-input-mobile header-flex header__skills">
                        <h3 class="header-wrap-right">Kỹ Năng</h3>
                        <i class="body-icon fa-solid fa-suitcase"></i>
                    </div>

                    <div class="body__skills">
                        <ul class="skills_list">
                            <li>
                                - <span class = "description-list-item-js description-list-mobile-js description-tablet-js">${arrays[9]}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="description__awards">
                    <div class="mt24  mb_rps-input-mobile header-flex header__awards">
                        <h3 class="header-wrap-right">Giải thưởng</h3>
                        <i class="body-icon fa-solid fa-award"></i>
                    </div>

                    <div class="body__awards">
                    <span class = "description-list-item-js description-list-mobile-js description-tablet-js">${arrays[10]}</span>
                    </div>
                </div>

                <div class="description__certificate">
                    <div class="mt24  mb_rps-input-mobile header-flex header__certificate">
                        <h3 class="header-wrap-right">Chứng chỉ</h3>
                        <i class="body-icon fa-solid fa-certificate"></i>
                    </div>

                    <div class="body__certificate">
                        <ul class="certificate_list">
                            <li>
                                -<span class = "description-list-item-js description-list-mobile-js description-tablet-js">${arrays[11]}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="description__interests">
                    <div class="mt24  mb_rps-input-mobile header-flex header__interests">
                        <h3 class="header-wrap-right">Sở thích</h3>
                        <i class="body-icon fa-regular fa-thumbs-up"></i>
                    </div>

                    <div class="body__interest">
                    <span class = "description-list-item-js description-list-mobile-js description-tablet-js">${arrays[12]}</span>
                    </div>
                </div>
            </div>

            <div class="col-right text_14px">
                <div class="description__level">
                    <div class="mt24 mb_rps-input-mobile header-flex header__level">
                        <i class="body-icon fa-solid fa-trophy"></i>
                        <h3 class="header-wrap-left">Trình độ học vấn</h3>
                    </div>

                    <div class="body__level">
                        <p class = "place_university description-tablet-js">
                            <strong>Tốt nghiệp trường</strong>: ${arrays[13]}
                        </p>
                        <p class="place__university description-tablet-js">
                            <strong>Trường/ nơi đào tạo</strong>: ${arrays[14]}
                        </p>
                        <p class="place__university description-tablet-js">
                            <strong>Khoa</strong>: ${arrays[15]}
                        </p>
                    </div>
                </div>

                <div class="description__experience">
                    <div class="mt24 mb_rps-input-mobile header-flex header__experience">
                        <i class="body-icon fa-solid fa-user-gear"></i>
                        <h3 class="header-wrap-left">Kinh nghiệm làm việc</h3>
                    </div>

                    <div class="body__experience description-tablet-js description-mobile-js">
                        ${arrays[16]}
                    </div>
                </div>

                <div class="description__projects">
                    <div class="mt24 mb_rps-input-mobile header-flex header__projects">
                        <i class="body-icon fa-solid fa-bars"></i>
                        <h3 class="header-wrap-left">Dự án tham gia</h3>
                    </div>

                    <div class="body__projects">
                        <p class = "description-tablet-js description-mobile-js">
                            - <strong>${arrays[17]}</strong>
                        </p>

                        <p class = "description-tablet-js description-mobile-js">
                            ${arrays[18]}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    sessionStorage.setItem('data_arrays', arrays);
    sessionStorage.setItem('data', htmls);
    document.querySelector(".my-modal-body").innerHTML = sessionStorage.getItem('data');
    alert("Dữ liệu đã được gửi! Bạn có thể xem ở phần Xem lại!");
}

document.querySelector(".my-modal-body").innerHTML = sessionStorage.getItem('data');



// Show Result 
const showReview = document.querySelector(".show-review");
const modal = document.querySelector('.js-modal');
const modalClose = document.querySelector('.js-modal-close');

function showReviews() {
    modal.classList.add('open');
}

function hideReviews() {
    modal.classList.remove('open')
}

showReview.addEventListener('click', showReviews);
modalClose.addEventListener('click', hideReviews);


// Reload Page
btn_reLoad.addEventListener("click", editReLoad);

function editReLoad() {
    let inputs = document.querySelectorAll(".input_handle");
    let text = "Bạn đang yêu cầu chỉnh lại nội dung, bạn chắc chứ ?";
    let text2 = "Avatar của bạn sẽ phải tự nhập lại, bạn đồng ý chứ ?"
    if (confirm(text) === true && confirm(text2) === true) {
        for (let i = 1; i < inputs.length; i++) {
            inputs[i].value = sessionStorage.getItem('data_arrays').split(/,/)[i];
        }
    }
}
// document.onkeydown = function (e) {
//     switch (e.which) {
//         case 116: {
//             e.preventDefault();
//             let text = "F5 sẽ điền lại tất cả! Bạn chắc chứ ?";
//             if (confirm(text) === true) {
//                 location.reload();
//             }
//             break;
//         }
//     }
// }

// let keysPressed = {};
// document.addEventListener('keydown', (event) => {
//     keysPressed[event.key] = true;

//     if (keysPressed['Control'] && event.key == 'r') {
//         event.preventDefault();
//         let text = "Crt + R sẽ điền lại tất cả! Bạn chắc chứ ?";
//         if (confirm(text) === true) {
//             location.reload();
//         }
//     }
// });

// document.addEventListener('keyup', (event) => {
//     delete keysPressed[event.key];
// });
