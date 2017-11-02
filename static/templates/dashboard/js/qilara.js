$(document).ready(function(){
    var hash = window.location.hash;
      hash && $('ul.nav a[href="' + hash + '"]').tab('show');

      $('.nav-tabs a').click(function (e) {
        $(this).tab('show');
        var scrollmem = $('body').scrollTop() || $('html').scrollTop();
        window.location.hash = this.hash;
        $('html,body').scrollTop(scrollmem);
      });
                  
    $('#checkAll').on('click', function(e) {
        $('.cb-item').prop('checked', $(e.target).prop('checked'));
    });

    if(jQuery().DataTable) {
        $('.table_wdelete').DataTable({
            sPaginationType: "full_numbers",            
            "iDisplayLength": 25,
            responsive : true,
            "dom": 'lfrt<"toolbar">ip',
            "fnDrawCallback": function (oSettings){ 
                $('input.flat').iCheck({
                    checkboxClass: 'icheckbox_flat-green',
                    radioClass: 'iradio_flat-green'
                });
            }
        });

        $("div.toolbar").html('<button type="submit" class="btn btn-danger" id="del_records">'
            + '<i class="fa fa-remove"></i> Hapus </button>');

        $('#logger_list').DataTable({
            sPaginationType: "full_numbers",
            "iDisplayLength": 25
        });

        $('#datatable_common').DataTable({
            sPaginationType: "full_numbers",
            "iDisplayLength": 25,
            "dom": 'lfrt<"toolbar">ip'
        });

        $('#datatable_common10').DataTable({
            sPaginationType: "full_numbers",
            "iDisplayLength": 10,
            "dom": 'lfrt<"toolbar">ip'
        });

        $("div.toolbar").on("click", "#del_records", function(e){
            e.preventDefault();
            var form = $(this).parents('form');

            var checkCount = $(".bulk_action input[name='table_records[]']:checked").length;

            if (checkCount > 0) {
                swal({
                  title: 'Apakah anda yakin?',
                  text: "Data akan hilang secara permanen!",
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Ya, Saya Yakin!',
                }).then(function(){
                    form.submit();
                }).catch(swal.noop);
            } else {
                swal(
                      'Error!',
                      'Tidak ada data yang dipilih!',
                      'error'
                    )
            }

            
        });
    }

    if(jQuery().switchery) {
        if ($(".js-switch")[0]) {
            var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
            elems.forEach(function (html) {
                var switchery = new Switchery(html, {
                    color: '#26B99A',
                    size: 'small'
                });
            });
        }
    }

    if(jQuery().datepicker) {
        $('.datepicker').datepicker({
            format: "dd/mm/yyyy",
            autoclose: true,
            todayHighlight: true
        });

        $('input[name="tanggal"]').datepicker({
            format: "dd/mm/yyyy",
            autoclose: true,
            todayHighlight: true
        }).on('changeDate', function(e) {
            $('input[name="tanggal2"]').datepicker('setStartDate', e.date);
        });

        $('input[name="tanggal2"]').datepicker({
            format: "dd/mm/yyyy",
            autoclose: true,
            todayHighlight: true
        });

        $('input[name="tanggal_awal"]').datepicker({
            format: "dd/mm/yyyy",
            autoclose: true,
            todayHighlight: true
        }).on('changeDate', function(e) {
            $('input[name="tanggal_akhir"]').datepicker('setStartDate', e.date);
        });

        $('input[name="tanggal_akhir"]').datepicker({
            format: "dd/mm/yyyy",
            autoclose: true,
            todayHighlight: true
        });

        $("select[name=keterangan]").change(function(){
            if ($("select[name=keterangan]").val() != "H") {
                $('.to_date').show();
                $('.edit_hour').hide();
            } else {
                $('.to_date').hide();
                $('.edit_hour').show();
            }
        });

    }

    if(jQuery().multipleSelect)
    {
        $('.users').multipleSelect({
                filter: true,
                selectAll : false,
                single : true,
                onClick : function(view) {
                    var user_id = view.value;
                    var tgl =  $('input[name="tanggal"]').val()

                    if ($("select[name=keterangan]").val() == "H")
                    {
                        get_attendance(tgl, user_id);
                    }
                }
        });

        $('.global_users').multipleSelect({
            filter: true,
            selectAll : false,
            single : true
        });
    }


    if(jQuery().inputmask) {
        $(".time_mask").inputmask('99:99');
        $("input[name='ip']").inputmask();
    }
    
    $('.announcement').click(function(){
        var id = $(this).attr("alt");

        $.get( "show_announcement/" + id, function( data ) {
            var json = JSON.parse(data);

            $('.modal-title2').html(json.title);
            $('.modal-body2').html(json.content);
            $('.announcement_modal').modal();
        });
    });

    // $('.show_leave').click(function(){
    //     var id = $(this).attr("alt");
    //
    //     $.get(id, function( data ) {
    //         var json = JSON.parse(data);
    //
    //         $('.modal-title2').html(json.title);
    //         $('.name_placeholder').html(json.name);
    //         $('.date_placeholder').html(json.date);
    //         $('.show_leave_modal').modal();
    //     });
    // });

    if(jQuery().zabuto_calendar)
    {
        $("#my-calendar").zabuto_calendar({
            today: true,
            ajax: {
                url: 'show_agenda',
                modal: true
            }
        });
    }

    if(jQuery().TouchSpin)
    {
        $("input[name='urutan']").TouchSpin({verticalbuttons: true});
    }

    if(jQuery().daterangepicker)
    {
        $(".single_daterangepicker").daterangepicker({
                    singleDatePicker: true,
                    autoUpdateInput: false,
                    singleClasses: "picker_1",
                    locale: {
                          format: 'DD/MM/YYYY'
                    }
                });

        $('.single_daterangepicker').on('apply.daterangepicker', function(ev, picker) {
              $(this).val(picker.startDate.format('DD/MM/YYYY'));
        });    

        $(".dropdown_daterangepicker").daterangepicker({
                    singleDatePicker: true,
                    autoUpdateInput: false,
                    showDropdowns: true,
                    singleClasses: "picker_1",
                    locale: {
                          format: 'DD/MM/YYYY'
                    }
                });

        $('.dropdown_daterangepicker').on('apply.daterangepicker', function(ev, picker) {
              $(this).val(picker.startDate.format('DD/MM/YYYY'));
        });
    }
    

    check_leave_type();

    $('select[name=tipe]').change(function(){
        check_leave_type();
    });

    $('input[name=copy_date]').change(function(){
        var jam_kerja_list = ['min_jam', 'maks_jam', 'jam_masuk', 'jam_pulang',
            'toleransi_jam_masuk', 'toleransi_jam_pulang', 'istirahat_dari', 'istirahat_sampai',
            'jam_kerja', 'standar_jam_masuk', 'standar_jam_pulang'];

        if ($(this).is(':checked')) {
            jam_kerja_list.forEach(function(val) {
                $("input[name^='"+ val +"']").val($("input[name='"+ val +"[1]']").val());
            });
        }
    });

});

    function check_leave_type()
    {
        if ($('select[name=tipe]').val() == 12) {
            $('.reason_leave').show('fast');
            $('input[name=alasan]').attr('required','required')
        }
        else {
            $('.reason_leave').hide('fast');
            $('input[name=alasan]').removeAttr('required')
        }
    }

    function get_attendance(date, user_id)
    {
        $.post("get_attendance", { date:date, user_id : user_id,
                                   _token : $('input[name=_token]').val()
                },
            function(data) {
                if (data != 0) {
                    data = JSON.parse(data);

                    $('input[name=masuk]').val(data[0].masuk);
                    $('input[name=pulang]').val(data[0].pulang);
                }
            }
        );
    }

    function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }