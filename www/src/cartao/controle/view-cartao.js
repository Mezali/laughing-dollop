$(document).ready(function() {

    $('#table-cartao').on('click', 'button.btn-view', function(e) {

        e.preventDefault()

        // Alterar as informações do modal para apresentação dos dados

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Visualização de registro')

        let UID = `UID=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: UID,
            url: 'src/cartao/modelo/view-cartao.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/cartao/visao/form-cartao.html', function() {
                        $('#UID').val(dado.dados.UID)
                        $('#UID').attr('readonly', 'true')
                        $('#PASS').val(dado.dados.PASS)
                        $('#PASS').attr('readonly', 'true')
                    })
                    $('.btn-save').hide()
                    $('#modal-cartao').modal('show')
                } else {
                    Swal.fire({ // Inicialização do SweetAlert
                        title: 'SGPO', // Título da janela SweetAler
                        text: dado.mensagem, // Mensagem retornada do microserviço
                        type: dado.cartao, // cartao de retorno [success, info ou error]
                        confirmButtonText: 'OK'
                    })
                }
            }
        })

    })
})