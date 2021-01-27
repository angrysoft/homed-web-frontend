var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Place = /** @class */ (function (_super) {
    __extends(Place, _super);
    function Place(name, id) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.id = id;
        return _this;
    }
    return Place;
}(HTMLDivElement));
var PlaceName = /** @class */ (function (_super) {
    __extends(PlaceName, _super);
    function PlaceName(name) {
        var _this = _super.call(this) || this;
        _this.innerHTML = "<div class=\"row center-xs place-name\"><div class=\"col-xs-12 txt-center\"><p>${name}</p></div></div>";
        return _this;
    }
    return PlaceName;
}(HTMLElement));
