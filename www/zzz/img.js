$(document).ready(function() {
    $('.btn-save').click(function(e) {
        e.preventDefault()

        if ($('#operacao').val() == 'insert') {
            url = "src/noticia/model/save-noticia.php"
        } else {
            url = "src/noticia/model/edit-noticia.php"
        }

        var formData = new FormData(document.getElementById("form-noticia"))

        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            mimeType: "multipart/form-data",
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            success: function(dados) {
                Swal.fire({
                    title: 'Gerenciador Etec Cafelândia',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-noticia').modal('hide')
                $('#table-noticia').DataTable().ajax.reload()
            }
        })
    })
})