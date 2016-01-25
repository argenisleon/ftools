function NaN_to_Zero(value) {
    value = (isNaN(value)) ? 0 : value;
    value = (isFinite(value)) ? value : 0;
    return value;

}

$(document).ready(function () {
    // Calculo del parametro n de fibonacci
    // http://www.math.rutgers.edu/~erowland/fibonacci.html
    var golden_number = 1.6180339887498948420;

    // Just make the first fibonacci calculation
    calculate_fibonacci();
    calculate_multiplier

    $('#start_value').keydown(function (e) {
        var value = $('#start_value').val();

        switch (e.which) {

            case 38: // up
                $('#start_value').val(Math.round(value * golden_number));
                calculate_fibonacci();
                calculate_multiplier();
                break;
            case 40: // down
                $('#start_value').val(Math.round(value / golden_number));
                calculate_fibonacci();
                calculate_multiplier();
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    $('#start_value').on('input', function () {
        // Just accept numbers
        this.value = this.value.replace(/[^0-9\.]/g, '');
        calculate_fibonacci();
        calculate_multiplier();


    });
    $('#f_up_series_container, #f_down_series_container').on('click', 'span', function (e) {

        e.stopPropagation();
        $('#start_value').val(($(e.target).html()));
        calculate_fibonacci();
        calculate_multiplier();


    });


    $('#total_width').on('input', calculate_gutter);
    $('#column').on('input', calculate_gutter);
    $('#column_width').on('input', calculate_gutter);

    $('#gutter').on('input', calculate_column);
    $('#gutter_width').on('input', calculate_column);

    // Functions
    function calculate_multiplier() {
        value = $('#start_value').val();

        $('#multiplier').empty();

        for (var i = 0; i <= 10; i++) {
            multiplier = ((i / 10) + 1);
            temp = value * multiplier;

            // if float use only two float numbers
            if (temp % 1 !== 0) {
                temp = temp.toFixed(2)
            }
            $('#multiplier').append('<div class="multiplier_container"><div class="multiplier">' + multiplier + '</div><div>' + temp + '</div></div>');
        }
    }

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
        var original_value = $('#start_value').val();
        $("#f_down_series_container").empty();
        $("#f_up_series_container").empty();


        for (var i = 1; i <= serie_length; i++) {
            secuence_value = Math.round(original_value / Math.pow(golden_number, i));
            secuence_value_e = Math.round(original_value / Math.pow(golden_number, i - 3));

            $("#f_down_series_container").append("<div><span class='main_number'>" + secuence_value + "</span>" +
                "</div>");
        }

        for (var i = serie_length; i >= 1; i--) {
            secuence_value = Math.round(original_value * Math.pow(golden_number, i));
            secuence_value_e = Math.round(original_value * Math.pow(golden_number, i - 3));

            $("#f_up_series_container").append("<div><span class='main_number'>" + secuence_value + "</span>" +
                "<span class='minus_third'>" + (secuence_value - secuence_value_e) + "</span></div>");
        }
    }
});