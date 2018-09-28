    $('document').ready(function() {
       $('.upld1-img').on('change','input', function(e){
     readURL(this);
    });
     function readURL(input) {

       if (input.files && input.files[0]) {
           var reader = new FileReader();
           // console.log(reader);
           reader.onload = function (e) {
               
              $(input).parents('.upld1-img').find('.upld-item').attr('src', e.target.result);
           }
           
           reader.readAsDataURL(input.files[0]);
       }
   }
  });