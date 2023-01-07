$(document).ready(function() {

    $('.btn-save').click(function(e) {
        e.preventDefault()

        let dados = $('#form-cartao').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/cartao/modelo/save-cartao.php',
            success: function(dados) {
                Swal.fire({
                    title: 'SGPO',
                    text: dados.mensagem,
                    icon: dados.cartao,
                    confirmButtonText: 'OK'
                })

                $('#modal-cartao').modal('hide')
                $('#table-cartao').DataTable().ajax.reload()
            }
        })
    })

})