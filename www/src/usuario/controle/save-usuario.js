$(document).ready(function() {

    $('.btn-save').click(function(e) {

        e.preventDefault();

        let dados = $('#form-usuario').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/usuario/modelo/save-usuario.php',
            success: function(dados) {
                Swal.fire({
                    title: 'SGPO',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-usuario').modal('hide')
                $('#table-usuario').DataTable().ajax.reload()
            }
        })
    })

})