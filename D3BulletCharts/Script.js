

function D3BulletCharts_Init() {

    Qva.AddExtension("D3BulletCharts",
        function () {


            var _this = this;
            _this.ExtSettings = {};
            _this.ExtSettings.ExtensionName = 'D3BulletCharts';
            InitSettings();

            // Define one or more styles sheets to be used within the extension
            var cssFiles = [];
            cssFiles.push('Extensions/' + _this.ExtSettings.ExtensionName + '/lib/css/style.css');
            for (var i = 0; i < cssFiles.length; i++) {
                Qva.LoadCSS(Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?') + 'public=only' + '&name=' + cssFiles[i]);
            }

            // Define one or more javascript files to be used within the extension
            var jsFiles = [];
            jsFiles.push('Extensions/' + _this.ExtSettings.ExtensionName + '/lib/js/DebugUtils.js');
            jsFiles.push('Extensions/' + _this.ExtSettings.ExtensionName + '/lib/js/BaseUtils.js');
            jsFiles.push('Extensions/' + _this.ExtSettings.ExtensionName + '/lib/js/ExtensionUtils.js');
            jsFiles.push('Extensions/' + _this.ExtSettings.ExtensionName + '/lib/js/d3.v3.min.js');
            jsFiles.push('Extensions/' + _this.ExtSettings.ExtensionName + '/lib/js/BulletCharts.js');
            Qv.LoadExtensionScripts(jsFiles, function () {

                ConsoleClear();

                // Initialize the extension
                Init();

                // Rendering
                RenderChart();


            });

            // ------------------------------------------------------------------
            // Main Extension Code - Initialization
            // ------------------------------------------------------------------
            function Init() {
                ConsoleInfo("Init");
            }

            // Data Handling
            function GetData() {

                ConsoleInfo("Init Data");

                var jsonData = [];
                for (var i = 0; i < _this.Data.Rows.length; i++) {
                    var vTitle = _this.Data.Rows[i][0].text;;
                    var vSubtitle = _this.Data.Rows[i][1].text;
                    var vRange1 = parseFloat(_this.Data.Rows[i][2].text);
                    var vRange2 = parseFloat(_this.Data.Rows[i][3].text);
                    var vRange3 = parseFloat(_this.Data.Rows[i][4].text);
                    var vMeasure1 = parseFloat(_this.Data.Rows[i][5].text);
                    var vMeasure2 = parseFloat(_this.Data.Rows[i][6].text);
                    var vMarker1 = parseFloat(_this.Data.Rows[i][7].text);

                    jsonData[i] = { title: vTitle, subtitle: vSubtitle, ranges: [vRange1, vRange2, vRange3], measures: [vMeasure1, vMeasure2], markers: [vMarker1] };
                }

                return jsonData;

            }

            // ------------------------------------------------------------------
            // Main Extension Code - Rendering
            // ------------------------------------------------------------------
            function RenderChart() {

                ConsoleInfo("Render Container");


                //if ($("#" + _this.ExtSettings.ContainerId).length === 0) {
                    ConsoleLog("\tCreating chart container ...");

                    $divContainer = $(document.createElement("div"));
                    $divContainer.attr('id', _this.ExtSettings.ContainerId);
                    $divContainer.addClass("divBulletChartContainer");

                    $(_this.Element).empty();
                    $(_this.Element).append($divContainer);
                    RenderChartData(GetData());
                //}
                //else {
                //    ConsoleLog("\TNo need to create container, already exists ...");
                //    UpdateChartData();
                    
                //}

            }

            function UpdateChartData() {

                ConsoleInfo("Update Chart Data");

            }

            function RenderChartData(data) {

                ConsoleInfo("Render Chart");

                var colorSchema = (_this.Layout.Text0.text != '') ? _this.Layout.Text0.text : '';

                 var margin = { top: 5, right: 40, bottom: 20, left: 120 },
                    width = _this.GetWidth() - margin.left - margin.right,
                    height = 50 - margin.top - margin.bottom;                   //Todo: Work out how to configure this

                var chart = d3.bullet()
                    .width(width)
                    .height(height)
                    .colorSchema(colorSchema);

                var svg = d3.select("#" + _this.ExtSettings.ContainerId).selectAll("svg")
                      .data(data)
                    .enter().append("svg")
                      .attr("class", "bullet")
                      .attr("width", width + margin.left + margin.right)
                      .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                      .call(chart);

                var title = svg.append("g")
                    .style("text-anchor", "end")
                    .attr("transform", "translate(-6," + height / 2 + ")");

                title.append("text")
                    .attr("class", "title")
                    .text(function (d) { return d.title; });

                title.append("text")
                    .attr("class", "subtitle")
                    .attr("dy", "1em")
                    .text(function (d) { return d.subtitle; });

                //d3.selectAll("button").on("click", function () {
                //    svg.datum(randomize).call(chart.duration(1000)); // TODO automatic transition
                //});


                //function randomize(d) {
                //    if (!d.randomizer) d.randomizer = randomizer(d);
                //    d.ranges = d.ranges.map(d.randomizer);
                //    d.markers = d.markers.map(d.randomizer);
                //    d.measures = d.measures.map(d.randomizer);
                //    return d;
                //}

                //function randomizer(d) {
                //    var k = d3.max(d.ranges) * .2;
                //    return function (d) {
                //        return Math.max(0, d + k * (Math.random() - .5));
                //    };
                //}

            }

            // ------------------------------------------------------------------
            // Initialize Settings
            // ------------------------------------------------------------------
            function InitSettings() {

                _this.ExtSettings.UniqueId = _this.Layout.ObjectId.replace("\\", "_");

                 //Base Url for CSS Files
                _this.ExtSettings.LoadUrl = Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?') + 'public=only' + '&name=';
                _this.ExtSettings.ContainerId = 'BulletChart_' + _this.ExtSettings.UniqueId;

            }

            // -----------------------------------------------------------
            // Dropdown fix
            // -----------------------------------------------------------
            if (Qva.Mgr.mySelect == undefined) {
                Qva.Mgr.mySelect = function (owner, elem, name, prefix) {
                    if (!Qva.MgrSplit(this, name, prefix)) return;
                    owner.AddManager(this);
                    this.Element = elem;
                    this.ByValue = true;

                    elem.binderid = owner.binderid;
                    elem.Name = this.Name;

                    elem.onchange = Qva.Mgr.mySelect.OnChange;
                    elem.onclick = Qva.CancelBubble;
                }
                Qva.Mgr.mySelect.OnChange = function () {
                    var binder = Qva.GetBinder(this.binderid);
                    if (!binder.Enabled) return;
                    if (this.selectedIndex < 0) return;
                    var opt = this.options[this.selectedIndex];
                    binder.Set(this.Name, 'text', opt.value, true);
                }
                Qva.Mgr.mySelect.prototype.Paint = function (mode, node) {
                    this.Touched = true;
                    var element = this.Element;
                    var currentValue = node.getAttribute("value");
                    if (currentValue == null) currentValue = "";
                    var optlen = element.options.length;
                    element.disabled = mode != 'e';
                    //element.value = currentValue;
                    for (var ix = 0; ix < optlen; ++ix) {
                        if (element.options[ix].value === currentValue) {
                            element.selectedIndex = ix;
                        }
                    }
                    element.style.display = Qva.MgrGetDisplayFromMode(this, mode);

                }
            }

        })
};

D3BulletCharts_Init();
