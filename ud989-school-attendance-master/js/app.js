/* create an initial
 * attendance record if one is not found
 * within localStorage.
 */
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

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());

$(function() {
    var octopus = {

    };

    var view = {
        init: function() {
            this.studentRows = $('tbody .student');
            this.numOfStRows = studentRows.length;

            for(var i=0; i<numOfStRows; i++){
                var currRow = studentRows[i];
                currRow.$('td .attend-col').change(function() {
                    currRow.$('td .missed-col').val(currRow.$('td .attend-col:checked').length));
                }));
            }
        }
    };
});