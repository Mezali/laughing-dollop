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