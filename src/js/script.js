function NaN_to_Zero(value) {
    value = (isNaN(value)) ? 0 : value;
    value = (isFinite(value)) ? value : 0;
    return value;

}

$(document).ready(function () {
    var golden_number = 1.618;

    // Just make the first fibonacci calculation
    calculate_fibonacci();

    $('#fibonacci_value').keydown(function (e) {

        switch (e.which) {
            case 38: // up
                $('#fibonacci_value').val(Math.round($('#fibonacci_value').val() * golden_number));
                calculate_fibonacci();
                break;
            case 40: // down
                $('#fibonacci_value').val(Math.round($('#fibonacci_value').val() / golden_number));
                calculate_fibonacci();
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    $('#fibonacci_value').on('input', function () {
        // Just accept numbers
        this.value = this.value.replace(/[^0-9\.]/g, '');
        calculate_fibonacci();


    });
    $('#f_up_series_container, #f_down_series_container').click(function(e){
        $('#fibonacci_value').val(($(e.target).html()));
        calculate_fibonacci();
        e.stopPropagation();

    })


    $('#total_width').on('input', calculate_gutter);
    $('#column').on('input', calculate_gutter);
    $('#column_width').on('input', calculate_gutter);

    $('#gutter').on('input', calculate_column);
    $('#gutter_width').on('input', calculate_column);

    // Functions
    function calculate_gutter() {
        total_width = parseInt($('#total_width').val());
        column = parseFloat($('#column').val());

        column_width = parseInt($('#column_width').val());

        // Gutter
        gutter = column - 1;
        $('#gutter').val(NaN_to_Zero(parseInt(gutter)));

        // Gutter Width
        gutter_width = -((column * column_width) - total_width) / gutter;
        $('#gutter_width').val(NaN_to_Zero(gutter_width));
        //calculate_column();
    }

    function calculate_column() {
        total_width = parseInt($('#total_width').val());
        gutter = NaN_to_Zero(parseFloat($('#gutter').val()));
        gutter_width = parseFloat($('#gutter_width').val());

        column = gutter + 1;
        $('#column').val(parseInt(column));

        column_width = -((gutter_width * gutter) - total_width) / column;
        $('#column_width').val(NaN_to_Zero(column_width));

        $('#gutter').val(parseInt(gutter));


    }
    // Calculate de Fibonacci Serie
    function calculate_fibonacci() {
        var serie_length = 7;
        var original_value = $('#fibonacci_value').val();
        $("#f_down_series_container").empty();
        $("#f_up_series_container").empty();


        for (var i = 1; i <= serie_length; i++) {
            secuence_value = Math.pow(golden_number, i);
            $("#f_down_series_container").append("<div>" + Math.round(original_value / secuence_value) + "</div>");
        }

        for (var i = serie_length; i >= 1; i--) {
            secuence_value = Math.pow(golden_number, i);
            $("#f_up_series_container").append("<div>" + Math.round(original_value * secuence_value) + "</div>");
        }
    }
});