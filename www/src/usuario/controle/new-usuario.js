$(document).ready(function() {
    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar novo usuario de acesso')

        $('.modal-body').load('src/usuario/visao/form-usuario.html', function() {
            $.ajax({
                dataType: 'json',
                type: 'POST',
                assync: true,
                url: 'src/tipo/modelo/all-tipo.php',
                success: function(dados) {
                    for (const result of dados) {
                        $('#TIPO_ID').append(`<option value="${result.ID}">${result.NOME}</option>`)
                    }
                }
            })

            $.ajax({
                dataType: 'json',
                type: 'POST',
                assync: true,
                url: 'src/cartao/modelo/cartao-sem-usuario.php',
                success: function(dados) {
                    for (const result of dados) {
                        $('#CARTAO_ID').append(`<option value="${result.UID}">${result.UID}</option>`)
                    }
                }
            })
        })

        $('.btn-save').show()

        $('.btn-save').attr('data-operation', 'insert')

        $('#modal-usuario').modal('show')


    })

    $('.close, #close').click(function(e) {
        e.preventDefault()

        $('#modal-usuario').modal('hide')
    })
})