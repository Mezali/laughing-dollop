$(document).ready(function() {

    $('#table-cartao').on('click', 'button.btn-delete', function(e) {

        e.preventDefault()

        let UID = `UID=${$(this).attr('id')}`

        Swal.fire({
            title: 'SGPO',
            text: 'Deseja realmente excluir esse registro?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result => {
            if (result.value) {

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    assync: true,
                    data: UID,
                    url: 'src/cartao/modelo/delete-cartao.php',
                    success: function(dados) {
                        Swal.fire({
                            title: 'SGPO',
                            text: dados.mensagem,
                            icon: dados.cartao,
                            confirmButtonText: 'OK'
                        })

                        $('#table-cartao').DataTable().ajax.reload()
                    }
                })
            }
        }))

    })
})