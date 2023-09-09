(function() {
    $(document).ready(function() {
        let formLogin = document.getElementsByClassName('form-control');
        for(let i = 0; i < formLogin.length; i++) {
            formLogin[i].addEventListener('blur', function() {
                if(this.value.length >=1) {
                    this.nextElementSibling.classList.add('active');
                    this.nextElementSibling.classList.remove('error');
                }else if (this.value.length ="") {
                    this.nextElementSibling.classList.add('error');
                    this.nextElementSibling.classList.remove('active');
                }else{
                    this.nextElementSibling.classList.remove('active');
                }
            })
        }
    });
})();