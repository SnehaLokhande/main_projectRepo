function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZC_MM_GET_DOM_VAL_CDS/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}