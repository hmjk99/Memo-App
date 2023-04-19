
$(()=>{
    $(".trigger").on('click', ()=>{
        $(".modal").addClass("show-modal");
    });
      
    $(".close-button").on('click', ()=>{
        $(".modal").removeClass("show-modal");
    });
      
    $(document).click(function(event) {
        if (!$(event.target).closest(".modal,.trigger").length) {
            $(".modal").removeClass("show-modal");
        }
    });
})