$(document).ready(function() {
    $('#table-cartao').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "src/cartao/modelo/list-cartao.php",
            "type": "POST"
        },
        "language": {
            "url": "libs/DataTables/pt_br.json"
        },
        "columns": [{
                "data": 'UID',
                "className": 'text-center'
            },
            {
                "data": 'PASS',
                "className": 'text-center'
            },
            {
                "data": 'UID',
                "orderable": false,
                "searchable": false,
                "className": 'text-center',
                "render": function(data, type, row, meta) {
                    return `
                    <button id="${data}" class="btn btn-info btn-sm btn-view"><i class="fa-solid fa-eye"></i></button>
                    <button id="${data}" class="btn btn-primary btn-sm btn-edit"><i class="fa-solid fa-marker"></i></button>
                    <button id="${data}" class="btn btn-danger btn-sm btn-delete"><i class="fa-solid fa-trash"></i></button>
                    `
                }
            }
        ]
    })
})