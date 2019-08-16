sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"z_app_spare_parts/z_spare_parts1/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("z_app_spare_parts.z_spare_parts1.Component", {

		metadata: {
			manifest: "json",
			config:{
				fullWidth:true,
				serviceConfig:{
					name:"ZC_MM_GET_CONFIG_CDS",
					serviceUrl:"/sap/opu/odata/sap/ZC_MM_GET_CONFIG_CDS/"
				},serviceConfigSP:{
					name:"ZMM_SPARE_PARTS_SRV",
					serviceUrl:"/sap/opu/odata/sap/ZMM_SPARE_PARTS_SRV/"
				},
				serviceConfigPCN:{
					name:"ZC_MM_PCN_LIST_CDS",
					serviceUrl:"/sap/opu/odata/sap/ZC_MM_PCN_LIST_CDS/"
				},
				serviceConfigCluster:{
					name:"ZC_MM_MAT_CLASS_CDS",
					serviceUrl:"/sap/opu/odata/sap/ZC_MM_MAT_CLASS_CDS/"
				},
				serviceDomain:{
					name:"ZC_MM_GET_DOM_VAL_CDS",
					serviceUrl:"/sap/opu/odata/sap/ZC_MM_GET_DOM_VAL_CDS/"
				}
			}
		
		},
		
		
			
		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			
				var mConfig = this.getMetadata().getConfig(); //tghis
			
				var sServiceUrl = mConfig.serviceConfig.serviceUrl;//this
				var sServiceUrlSP = mConfig.serviceConfigSP.serviceUrl;
				var sServiceUrlPCN = mConfig.serviceConfigPCN.serviceUrl;
				var sServiceUrlCluster = mConfig.serviceConfigCluster.serviceUrl;
				var sServiceUrlDomain = mConfig.serviceDomain.serviceUrl;
			
			 var oDataModelConfig = new sap.ui.model.odata.ODataModel(sServiceUrl, {
				json: false, 
				loadMetadataAsync: true
			});
				this.setModel(oDataModelConfig,"oDataModelConfig");
			
			var oDataModelSP = new sap.ui.model.odata.ODataModel(sServiceUrlSP, {
				json: false, 
				loadMetadataAsync: true
			});
				this.setModel(oDataModelSP,"oDataModelSP");
				
			var oDataModelPCN = new sap.ui.model.odata.ODataModel(sServiceUrlPCN, {
				json: false, 
				loadMetadataAsync: true
			});
				this.setModel(oDataModelPCN,"oDataModelPCN");
				
			var oDataModelCluster = new sap.ui.model.odata.ODataModel(sServiceUrlCluster, {
				json: false, 
				loadMetadataAsync: true
			});
				this.setModel(oDataModelCluster,"oDataModelCluster");
				
					var oDataModelDomain = new sap.ui.model.odata.ODataModel(sServiceUrlDomain, {
				json: false, 
				loadMetadataAsync: true
			});
				this.setModel(oDataModelDomain,"oDataModelDomain");
				
				
		
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		},
			getContentDensityClass: function() {

  if (!this._sContentDensityClass) {
   if (!sap.ui.Device.support.touch) {
    this._sContentDensityClass = "sapUiSizeCompact";
   } else {
    this._sContentDensityClass = "sapUiSizeCozy";
   }
  }
  return this._sContentDensityClass;
 }
		
	});
});