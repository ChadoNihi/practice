/* create an initial
 * attendance record if one is not found
 * within localStorage.
 */
 var NumOfDays = 12;

(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i < NumOfDays; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.setItem('attendance', JSON.stringify(attendance));
    }
}());

$(function() {
    var octopus = {
        init: function() {
            view.init();
        }
    };

    var view = {
        init: function() {
            this.nameColumns = $('tbody .name-col');
            this.studentRows = $('tbody .student');
            this.numOfStRows = view.studentRows.length;
            var attendance = localStorage.getItem('attendance');
            if ($.type(attendance) === "string") attendance = JSON.parse(attendance);

            for(var i=0; i<view.numOfStRows; i++){
                var currRow = view.studentRows[i];
                var currChBoxes = $(currRow).find('td.attend-col>input');
                //var missCol = $(currRow).find('td.missed-col');
                var name = $(currRow).find(':first-child').text();
                var misses = 0;

                for (var j = 0; j < NumOfDays; j++) {
                    var currChBox = currChBoxes[j];
                    if (attendance[name][j]) $(currChBox).prop('checked', true);
                    else ++misses;

                    $(currChBox).change(function() {
                        var missCol = $(this).parent().siblings('td.missed-col');
                        if ($(this).prop('checked')) $(missCol).html( parseInt($(missCol).text())-1 );
                        else $(missCol).html( parseInt($(missCol).text())+1 );
                        //$(missCol).val($(currRow).find('td.attend-col:checked').length);
                    });
                }
                $(currRow).find('td.missed-col').text(misses);
            }

            $( window ).unload(function() {
                var attendance = {};

                for (i = 0; i < view.numOfStRows; i++) {
                    var name = view.nameColumns[i].innerText;
                    attendance[name] = [];

                    for (var j = 0; j < NumOfDays; j++) {
                        attendance[name].push(view.studentRows[i].$('td.attend-col')[j].is(':checked'));
                    }
                }
            });
        }
    };

    octopus.init();
});