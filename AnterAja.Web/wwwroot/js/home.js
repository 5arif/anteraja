$(function () {
    var apiUrl = 'http://localhost:11460'
    var modalMode = 'ADD';

    function getData(callback) {
        $.getJSON(apiUrl + '/package').done(callback);
    }

    function renderTable() {
        getData(function (data) {
            var tpl = genTpl(data);
            $('#package_table tbody').html(tpl);
        });
    }

    function genTpl(data) {
        var tpl = '';
        for (var i = 0; i < data.length; i++) {
            tpl += rowTpl(i + 1, data[i]);
        }

        return tpl;
    }

    function confirm(text, onYes) {
        $('#confirm_content').text(text);
        $('#confirm_dialog .modal-footer .btn-primary').unbind();
        $('#confirm_dialog .modal-footer .btn-primary').click((function () {
            if (onYes) {
                onYes();
            }

            $('#confirm_dialog').modal('hide');
        }));

        $('#confirm_dialog').modal('show');
    }

    function rowTpl(index, data) {
        var tpl = '<tr>' +
            ' <th scope="row" data-id="' + data.id + '">' + index + '</th>' +
            '   <td>' + data.packageName + '</td>' +
            '   <td>' + data.width + '</td>' +
            '   <td>' + data.height + '</td>' +
            '   <td>' + data.weight + '</td>' +
            '   <td>' + data.senderAddress + '</td>' +
            '   <td>' + data.senderName + '</td>' +
            '   <td>' + data.packageRecipient + '</td>' +
            '   <td>' + data.recipientAddress + '</td>' +
            '   <th scope="col">' +
            '       <i class="bi-pencil-fill mr-2"></i>' +
            '       <i class="bi-trash-fill red"></i>' +
            ' </th>' +
            '</tr>';

        return tpl;
    }

    function regEvent() {
        $('#btn-add').click(function () {
            clear();
            modalMode = 'ADD';

            $('#packageModal').modal('show');
        })

        $('.table').on('click', '.bi-pencil-fill', function (evt) {
            modalMode = 'EDIT';

            var id = $(evt.target.parentElement.parentElement).find('th')[0].getAttribute('data-id');
            var values = $(evt.target.parentElement.parentElement).find('td')
                .map(function (x, y) { return y.textContent; }); 

            $('#data-id').val(id);
            $('#package_name').val(values[0]);
            $('#package_width').val(values[1]);
            $('#package_heigth').val(values[2]);
            $('#package_weight').val(values[3]);
            $('#sender_address').val(values[4]);
            $('#sender_name').val(values[5]);
            $('#package_recipient').val(values[6]);
            $('#recipient_address').val(values[7]);

            $('#packageModal').modal('show');
        });


        $('.table').on('click', '.bi-trash-fill', function (evt) {
            console.log('Delete');

            modalMode = 'DELETE';
            var id = $(evt.target.parentElement.parentElement).find('th')[0].getAttribute('data-id');
            $('#data-id').val(id);

            var values = $(evt.target.parentElement.parentElement).find('td')
                .map(function (x, y) { return y.textContent; }); 

            var packageName = values[0];
            confirm('Hapus ' + packageName + ' ?', function () {
                $.ajax({
                    url: apiUrl + '/package/' + id,
                    type: 'DELETE',
                    success: function () {
                        renderTable();
                    }
                });
            });
        })

        $('.modal-footer .btn-secondary').click(clear);
        $('.modal-footer .btn-primary').click(function () {
            var data = {
                packageName: $('#package_name').val(),
                width: parseInt($('#package_width').val()),
                height: parseInt($('#package_heigth').val()),
                weight: parseInt($('#package_weight').val()),
                senderAddress: $('#sender_address').val(),
                senderName: $('#sender_name').val(),
                packageRecipient: $('#package_recipient').val(),
                recipientAddress: $('#recipient_address').val(),
            };

            console.log(data);
            switch (modalMode) {
                case 'ADD':
                    $.ajax({
                        type: "POST",
                        url: apiUrl + '/package',
                        contentType: "application/json",
                        data: JSON.stringify(data),
                        success: function () {
                            renderTable();
                            $('#packageModal').modal('hide');
                        },
                    });
                    break;
                case 'EDIT':
                    var id = $('#data-id').val();
                    $.ajax({
                        url: apiUrl + '/package/' + id,
                        type: 'PUT',
                        contentType: "application/json",
                        data: JSON.stringify(data),
                        success: function () {
                            renderTable();
                            $('#packageModal').modal('hide');
                        }
                    });

                    break;
            }
        });
    }

    function clear() {
        $('#packageModal .form-control').each(function (x, y) {
            y.value = ''
        });
    }

    function init() {
        renderTable();
        regEvent();
    }

    init();
});