$(document).on("turbolinks:load", function() {
    var Home = {
        originDDD: null,
        destinyDDD: null,
        callTime: null,
        result: null,
        plan: null,

        init: function() {
            Home.resetState();
            Home.loadElements();
            Home.loadEvents();
        },

        loadElements: function () {
            $("#h1-welcome").fadeIn(500);
            $("#div-content").fadeIn(1000);
            $("#plans").fadeIn(1500);
            $(".footer").fadeIn(2000);
        },

        loadEvents: function () {
            var _this = this;

            $("#avancar-to-ligacao").click(function() {
                var originDDD = $("#originDDD").val();
                var destinyDDD = $("#destinyDDD").val();

                _this.originDDD = originDDD;
                _this.destinyDDD = destinyDDD;

                $("#fd-locale").fadeOut(0);
                $("#fd-call").fadeIn(800);
            });

            $("#avancar-to-planos").click(function() {
                var callTime = $("#callTime").val();

                if (callTime) {
                    if (callTime <= 0) {
                        var type = "error";
                        var title = "Ops!";
                        var message = "Tempo de ligação deve ser maior que 0!";

                        _this.showToast(type, title, message);
                    }
                    else {
                        _this.callTime = parseInt(callTime);
                        $("#fd-call").fadeOut(0);
                        $("#fd-plans").fadeIn(800);
                    }
                }
                else {
                    var type = "error";
                    var title = "Ops!";
                    var message = "Preencha o tempo de ligação!";

                    _this.showToast(type, title, message);
                }
            });

            $("#advance-to-result").click(function() {
                var plan = $("#plan").val();
                _this.plan = parseInt(plan);

                $("#fd-plans").fadeOut(0);
                $("#fd-loading").fadeIn(800);
                
                setTimeout(function() {
                    $("#fd-loading").fadeOut(0);
                    $("#div-result").fadeIn(800);
                    $("#div-return").fadeIn(800);
                    $("#div-result").css("display", "flex");

                    $("#withFaleMaisPlan").text(_this.plan);
                    $("#withoutFaleMaisPlan").text(_this.plan);

                    _this.showResult();
                    
                }, 2000);
            });
            
            $("#reset").click(function() {
                $("#div-result").fadeOut(0);
                $("#div-return").fadeOut(0);
                $("#fd-locale").fadeIn(800);

                _this.resetState();
            });
        },

        showToast: function(type, title, message) {
            if (type == "error") {
                iziToast.error({
                    title: title,
                    message: message
                });
            }
            if (type == "warning") {
                iziToast.warning({
                    title: title,
                    message: message
                });
            }
            if (type == "success") {
                iziToast.success({
                    title: title,
                    message: message
                });
            }
        },

        showResult: function() {
            var result = this.calculateResult();

            withFaleMais = result ? result.withFaleMais : "-"
            withoutFaleMais = result ? result.withoutFaleMais : "-"
            $("#result-with-plan").text(withFaleMais);
            $("#result-without-plan").text(withoutFaleMais);
        },

        calculateResult: function() {
            if (this.originDDD == "011") {
                if (this.destinyDDD == "016") {
                    var minuteCost = 1.9;
                    return this.generateResultObj(minuteCost);
                }
                else if (this.destinyDDD == "017") {
                    var minuteCost = 1.7;
                    return this.generateResultObj(minuteCost);
                }
                else if (this.destinyDDD == "018") {
                    var minuteCost = 0.9;
                    return this.generateResultObj(minuteCost);
                }
            }
            else if (this.originDDD == "016") {
                if (this.destinyDDD == "011") {
                    var minuteCost = 2.9;
                    return this.generateResultObj(minuteCost);
                }
            }
            else if (this.originDDD == "017") {
                if (this.destinyDDD == "011") {
                    var minuteCost = 2.7;
                    return this.generateResultObj(minuteCost);
                }
            }
            else {
                if (this.destinyDDD == "011") {
                    var minuteCost = 1.9;
                    return this.generateResultObj(minuteCost);
                }
            }
        },

        generateResultObj: function(minuteCost) {
            var resultObj = {};
            var excess = this.plan - this.callTime;

            if (excess >= 0) {
                var resultWithFaleMais = 0;
                var resultWithoutFaleMais = minuteCost * this.callTime;

                resultObj.withFaleMais = "R$ " + resultWithFaleMais.toFixed(2);
                resultObj.withoutFaleMais = "R$ " + resultWithoutFaleMais.toFixed(2);
            }
            else {
                var resultWithFaleMais = 1.1 * minuteCost * (excess * -1);
                var resultWithoutFaleMais = minuteCost * this.callTime;

                resultObj.withFaleMais = "R$ " + resultWithFaleMais.toFixed(2);
                resultObj.withoutFaleMais = "R$ " + resultWithoutFaleMais.toFixed(2);
            }

            return resultObj;
        },

        resetState: function() {
            $("#originDDD").val("011");
            $("#destinyDDD").val("011");
            $("#callTime").val("");
            $("#plan").val("30")
        },
    }

    Home.init();
});