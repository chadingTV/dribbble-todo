var nowPage = 1;

$(function(){
    // card swipe move
    $(".card-area .card").on("swipeleft",function(){
       movePage(1);
    });
    $(".card-area .card").on("swiperight",function(){
       movePage(0);
    });

    // detial page open
    $(".card-area .card").on("swipeup",function(){
        detailOpen();
    });
    $(".card-area").on("click",".card-icon",function(){
        detailOpen();
    });

    // detail page close
    $(".card-area").on("swipedown",function(){
        detailClose();
    });
    $("header.detail .btn-close").on("click",function(){
        detailClose();
    });

    // detail list click event
    $(".card .bottom .list").on("click","li",function(){
        $(this).toggleClass("checked");
    });
    $(".card .bottom .list").on("click","li a",function(){
        $(this).parent().slideUp(200,function(){
            $(this).remove();
        });
        return false;
    });
    $(".card .bottom .list").on("scroll",function(e){
        e.stopPropagation();
        return false;
    });

    // detail open add task
    $(".btn-floating-plus").on("click",function(){
        toggleNewTask();
    });
    $(".new-task-page .btn-close").on("click",function(){
        toggleNewTask();
        return false;
    });
    $(".new-task-page").on("swipedown",function(){
        toggleNewTask();
    });

    $("#btn-menu").on("click",function(){
        $("body").toggleClass("openmenu");
    });
    $(".side-menu").on("click",function(){
        $("body").removeClass("openmenu");
    });

    $(".container").addClass("ready");


    if(detectWeb()){
        var imgurl = 'https://cdn.dribbble.com/users/1200964/screenshots/3812962/todo_concept_iphonex_30fps.gif';
        $("#sampleimg").attr("src",imgurl);
    }
});

function toggleNewTask(){
    console.log("toggleNewTask");
    if(!$("body").hasClass("open-new-task")){
        $("body").addClass("open-new-task");
        $("#input_new_task").val("").focus();
    }else{
        var newTaskValue = $("#input_new_task").val();
        if(newTaskValue){
            console.log(newTaskValue);
            var taskhtml = '<li>'+newTaskValue+'<a></a></li>';
            $(".card.active.open").find(".list ul:eq(0)").prepend(taskhtml);
        }
        $(".btn-floating-plus").focus();
        $("body").removeClass("open-new-task");
    }
}

function detailOpen(){
    console.log("swipeup");
    console.log("nowPage",nowPage);
    $(".card-area .card:eq("+(nowPage-1)+")").addClass("active open");
    $("body").addClass("open-detail");
}

function detailClose(){
    $(".card-area .card.active.open").removeClass("open").addClass("close");
    setTimeout(function(){
        $(".card-area .card.active").removeClass("close").removeClass("active");
    },300);
    $("body").removeClass("open-detail").removeClass("open-new-task");
}

function movePage(plus){
    if($("body").hasClass("open-detail")){
        detailClose();
        return false;
    }
    if(plus){
        nowPage++;
        if(nowPage>3){
            nowPage = 3;
        }
    }else{
        nowPage--;
        if(nowPage<1){
            nowPage = 1;
        }
    }
    $("body").attr("class","page"+nowPage);
}

function detectWeb() {
   if(window.innerWidth > 800 && window.innerHeight >= 820) {
     return true;
   } else {
     return false;
   }
}