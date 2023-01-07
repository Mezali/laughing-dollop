$(document).ready(function() {

    $.ajax({
        type: 'POST',
        dataType: 'json',
        assync: true,
        url: 'src/usuario/modelo/validate-usuario.php',
        success: function(dados) {

            if (dados.tipo == 'error') {
                $(location).attr('href', 'index.html')

            } else {

                if (dados.user == '2') {

                    $('.user').hide()
                    $('#content').load('src/usuario/visao/list-usuario.html')

                } else if (dados.user == '1') {

                    $('.adm').hide()
                    $('#nome').append(dados.nome)
                    $('#cartao').append(dados.cartao)
                    $('#passes').append(dados.pass)

                }


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