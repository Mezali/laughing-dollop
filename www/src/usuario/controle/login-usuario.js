$(document).ready(function() {

    $('.btn-login').click(function(e) {

        e.preventDefault();

        let dados = $('#form-login').serialize()

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/usuario/modelo/login-usuario.php',
            success: function(dados) {

                if (dados.tipo == 'success') {
                    $(location).attr('href', 'adm.html')
                } else {
                    Swal.fire({
                        title: 'SGPO',
                        text: dados.mensagem,
                        icon: dados.tipo,
                        confirmButtonText: 'OK'
                    })

                }
            }
        })
    })

})