/*!
* Start Bootstrap - Blog Home v5.0.6 (https://startbootstrap.com/template/blog-home)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-blog-home/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
    $(document).ready(function() {

        var tmp = $(".startTime option:selected").val();

        <!--초기화-->
        const id = $("#username");
        const pwd = $("#password");
        const rePwd = $("#rePassword");
        const firstName = $("#firstName");
        const lastName = $("#lastName");
        const phoneNum = $("#phoneNum");

        const result = $(".nameCheckResult");
        const pwdResult = $(".pwdCheckResult");
        const idResult = $(".idCheckResult");
        const nameResult = $(".nameCheckResult");
        const mobileResult = $(".mobileCheckResult");

        const pwdReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*=-])(?=.*[0-9]).{8,15}$/;

        // blur 이벤트 / 유효성

        pwd.blur(function(e) {
            const pwdResult = $(".pwdCheckResult");

            if(pwd.val().length == 0 || pwd.val().length > 15) {
                pwdResult.html("영문, 숫자, 특수문자 조합 8~15자");
                pwdResult.css("font-size","8px")
                pwdResult.css("color","red")
                return false;
            } else if(!pwdReg.test(pwd.val())) {
                pwdResult.html("영문, 숫자, 특수문자 조합 8~15자");
                pwdResult.css("font-size","8px")
                pwdResult.css("color","red")
                return false;
            } else {
                pwdResult.html("알맞은 비밀번호입니다.");
                pwdResult.css("font-size","8px")
                pwdResult.css("color","blue")
                return true;
            }
        });

        rePwd.blur(function(e) {
            const rePwdCheck = $(".rePwdCheckResult");

            if(pwd.val() != rePwd.val()) {
                rePwdCheck.html("비밀번호가 일치하지 않습니다.");
                rePwdCheck.css("font-size","8px")
                rePwdCheck.css("color","red")
                return false;
            } else {
                rePwdCheck.html("비밀번호가 일치합니다");
                rePwdCheck.css("font-size","8px")
                rePwdCheck.css("color","blue")
                return true;
            }
        });

        firstName.blur(function(e) {
            if(firstName.val().length > 3) {
                nameResult.html("3글자를 초과할 수 없습니다.");
                nameResult.css("font-size","8px")
                nameResult.css("color","red")
                return false;
            } else if(firstName.val().length == 0) {
                nameResult.html("이름을 입력해주세요.");
                nameResult.css("font-size","8px")
                nameResult.css("color","red")
                return false;
            } else if(firstName.val().length > 0 && firstName.val().length <= 2) {
                nameResult.html( "");
                return true;
            }
        });

        lastName.blur(function(e) {
           if(lastName.val().length == 0) {
                nameResult.html("이름을 입력해주세요.");
                nameResult.css("font-size","8px")
                nameResult.css("color","red")
                return false;
           } else if(lastName.val().length > 0) {
                nameResult.html( "");
                return true;
           }
        });

        phoneNum.blur(function() {
            if(phoneNum.val().length == 0) {
                mobileResult.html("연락처를 입력해주세요요.");
                mobileResult.css("font-size","8px")
                mobileResult.css("color","red")
                return false;
            } else if(phoneNum.val().length == 0) {
                mobileResult.html("이름을 입력해주세요.");
                mobileResult.css("font-size","8px")
                mobileResult.css("color","red")
                return false;
            }
        });

        // option 태그 추가

        for(var i = 1; i < 50; i++) {
            $(".experience").append("<option value="+i+" name='experience'>"+i+"년차"+"</option>");
        }

        for(var i = 0; i <= 47; i++) {
            var hour = "";
            var min = ":00";

            if((Math.ceil(i/2)) < 13) {
                hour = Math.floor(i/2);
            } else {
                hour = Math.floor(i/2);
            }
            if((Math.ceil(i%2)) != 0) { <!--나머지 0 또는 1-->
                var min = ":30";
            }

            // $(".startTime").append("<option value="+hour+min">"+hour+min+"</option>");
            $(".startTime").append("<option value="
            + ((hour >= 10) ? hour : ('0'+hour)) + min + ">" + ((hour >= 10) ? hour : ("0"+hour)) + min + "</option>" );
        }

        for(var i = 47; i >= 0; i--) {
            var hour = "";
            var min = ":00";

            if((Math.ceil(i/2)) < 13) {
                hour = Math.floor(i/2);
            } else {
                hour = Math.floor(i/2);
            }
            if((Math.ceil(i%2)) != 0) { <!--나머지 0 또는 1-->
                var min = ":30";
            }

            $(".endTime").append("<option value="
            + ((hour >= 10) ? hour : ('0'+hour)) + min+ ">" + ((hour >= 10) ? hour : ("0"+hour)) + min +"</option>" );
        }

        // 아이디 | 연락처 | 추천인 중복체크


       $("#username").blur(function() {

            const regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

            if(!regEmail.test(id.val())) {
                idResult.html("이메일 형식으로 아이디를 입력해주세요");
                idResult.css("font-size","8px")
                idResult.css("color","red")
                id.focus();
                return false;
            }

//            if(id.val().length == 0) {
//                idResult.html("아이디를 입력해주세요.");
//                idResult.css("font-size","8px")
//                idResult.css("color","red")
//                id.focus();
//                return false;
//            }

            $.ajax({
                url: "/antddun/idCheck",
                type: "POST",
                dataType: "JSON",
                data: {"email" : $("#username").val()},
                success: function(data) {
                    if(data == 1) {
                        idResult.html("중복된 아이디입니다.");
                        idResult.css("font-size","8px")
                        idResult.css("color","red")
                        return false;
                    } else if(data == 0) {
                        idResult.html("사용 가능한 아이디입니다.");
                        idResult.css("font-size","8px")
                        idResult.css("color","blue")
                        return true;
                    }
                }
            }) // ajax end.
        }); // btnCheck event end.

        $("#btnPhone").click(function() {
            $.ajax({
                url: "/antddun/phoneNumCheck",
                type: "POST",
                dataType: "JSON",
                data: {"phoneNum" : $("#phoneNum").val()+""},
                success: function(data) {
                    if(data == 1) {
                        alert("전화번호 중복");
                    } else if(data == 0) {
                        alert("전화번호 사용 가능");
                    }
                }
            }) // ajax end.
        }); // phoneAuthBtn event end.

        // submit 유효성 검사

        $(".btnJoin").click(function() {
            if(id.val() == "") {
                idResult.html("아이디를 입력해주세요.");
                idResult.css("font-size","8px")
                idResult.css("color","red")
                id.focus();
                return false;
            } else if(idResult.value == "중복된 아이디입니다.") {
                id.focus();
                return;
            }

            if(!pwdReg.test(pwd.val())) {
                pwdResult.html("영문, 숫자, 특수문자 조합 8~15자");
                pwdResult.css("font-size","8px")
                pwdResult.css("color","red")
                pwd.focus();
                return false;
            }

            if(rePwd.val() == "") {
                rePwdCheck.html("비밀번호를 재확인해주세요.")
                rePwdCheck.css("font-size","8px")
                rePwdCheck.css("color","red")
                rePwd.focus();
                return false;
            }

            if(pwd.val() != rePwd.val()) {
                rePwdCheck.html("비밀번호를 재확인해주세요.")
                rePwdCheck.css("font-size","8px")
                rePwdCheck.css("color","red")
                pwd.val() = "";
                rePwd.val() = "";
                pwd.focus();
                return false;
            }

            if(firstName.val() == "") {
                nameResult.html("이름(성)을 입력해주세요.")
                nameResult.css("font-size","8px")
                nameResult.css("color","red")
                firstName.focus();
                return false;
            }

            if(lastName.val() == "") {
                nameResult.html("이름을 입력해주세요.")
                nameResult.css("font-size","8px")
                nameResult.css("color","red")
                lastName.focus();
                return false;
            }

            if(phoneNum.val() == "") {
                mobileResult.html("연락처를 입력해주세요.")
                mobileResult.css("font-size","8px")
                mobileResult.css("color","red")
                phoneNum.focus();
                return false;
            }
//            alert($('.startTime').val());
            $("#frm").submit();
        });

    }); // join