$(document).ready(function() {

    $('#table-usuario').on('click', 'button.btn-edit', function(e) {

        e.preventDefault()

        // Alterar as informações do modal para apresentação dos dados

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Visualização de registro')

        let ID = `ID=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: ID,
            url: 'src/usuario/modelo/view-usuario.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/usuario/visao/form-usuario.html', function() {

                        //Consultar todos os tipos cadastrados no banco de dados
                        $.ajax({
                            dataType: 'json',
                            type: 'POST',
                            assync: true,
                            url: 'src/tipo/modelo/all-tipo.php',
                            success: function(dados) {
                                for (const result of dados) {
                                    if (result.ID == TIPO_ID) {
                                        $('#TIPO_ID').append(`<option value="${result.ID}" selected>${result.NOME}</option>`)
                                    } else {
                                        $('#TIPO_ID').append(`<option value="${result.ID}">${result.NOME}</option>`)
                                    }

                                }
                            }
                        })
                        //Consultar todos os cartões cadastrados no banco de dados
                        $.ajax({
                            dataType: 'json',
                            type: 'POST',
                            assync: true,
                            url: 'src/tipo/cartao/cartao-sem-usuario.php',
                            success: function(dados) {
                                for (const result of dados) {
                                    if (result.ID == CARTAO_UID) {
                                        $('#CARTAO_UID').append(`<option value="${result.UID}" selected>${result.UID}</option>`)
                                    } else {
                                        $('#CARTAO_UID').append(`<option value="${result.UID}">${result.UID}</option>`)
                                    }

                                }
                            }
                        })
                    })

                        $('#NOME').val(dado.dados.NOME)
                        $('#CELULAR').val(dado.dados.CELULAR)
                        $('#LOGIN').val(dado.dados.LOGIN)
                        $('#SENHA').val(dado.dados.SENHA)
                        $('#TIPO_ID').val(dado.dados.TIPO_ID)
                        $('#CARTAO_ID').val(dado.dados.CARTAO_UID)
                        $('#ID').val(dado.dados.ID)

                        var TIPO_ID = dado.dados.TIPO_ID
                        var CARTAO_UID = dado.dados.CARTAO_UID

                    $('.btn-save').removeAttr('data-operation', 'insert')
                    $('.btn-save').show()
                    $('#modal-usuario').modal('show')
                } else {
                    Swal.fire({ // Inicialização do SweetAlert
                        title: 'SGPO', // Título da janela SweetAlert
                        text: dado.mensagem, // Mensagem retornada do microserviço
                        type: dado.tipo, // usuario de retorno [success, info ou error]
                        confirmButtonText: 'OK'
                    })
                }
            }
        })

    })
})