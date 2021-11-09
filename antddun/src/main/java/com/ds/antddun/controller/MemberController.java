package com.ds.antddun.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
@Log4j2
public class MemberController {

    @GetMapping("/loginPage")
    public String loginPage() {
        log.info("LOGIN >>>>>>>>>>>>>>>>>>>>>>>>>>>");
        return "/member/login";
    }

    @GetMapping("/member/mypage")
    public String wallet() {
        return "/member/mypage";
    }
//    @PutMapping("member/updateMember")
//    public
}
