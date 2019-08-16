sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"z_app_spare_parts/z_spare_parts1/util/SubClassContent",
	"z_app_spare_parts/z_spare_parts1/util/SearchByClassification",
	"z_app_spare_parts/z_spare_parts1/util/MaterialCreation",

], function (Controller, MessageBox, Filter, SubClassContent, SearchByClassification, MaterialCreation) {
	//"use strict";

	return Controller.extend("z_app_spare_parts.z_spare_parts1.controller.ReviewReqCopyMaterial", {
		_onFioriObjectPageHeaderPress: function (oEvent) {
			var add_store_typ_value = oControllerObjReviewReqCopyMat.getView().byId("addstoreinputid_value_ReviewReqCopyMat").getTokens();
			oControllerObjReqCopyMat.getView().byId("addstoreinputid_value_ReqCopyMat").setTokens(add_store_typ_value)
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RequestCopyMaterial");

		},
		onInit: function (oEvent) {
			that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("ReviewReqCopyMaterial").attachPatternMatched(this.loadInitDataReviewReqCopyMat, this);
		},
		loadInitDataReviewReqCopyMat: function () {
			debugger;
			oControllerObjReviewReqCopyMat = this;
			var ClassificationTree = oControllerObjReviewReqCopyMat.getView().byId("idIconTabBarReviewRequestCopyMaterial")
			ClassificationTree.destroyItems();
			SubClassContent.loadReviewReqCopyMatJSONClassificationTree(oControllerObjReqCopyMat, oControllerObjReviewReqCopyMat);

			// oControllerObjReviewReqCopyMat.getView().byId("idoempartNumber_value_ReviewReqNewMat").setText(oemuserInputValue);

			// var iconTabContent = oControllerObjReqCopyMat.getView().byId("idIconTabBarRequestNewMaterial").getItems();
			// for(var i=0;i<iconTabContent.length;i++){
			// 	 oControllerObjReviewReqCopyMat.getView().byId("idIconTabBarReviewRequestNewMaterial").addItem(iconTabContent[i]);
			// }
			// var ReviewNoOEMAvailableCheckBox = oControllerObjReviewReqCopyMat.getView().byId("idBtnNoOemAvailable_ReviewReqCopyMat");
			// if (oControllerObjReqCopyMat.setNoOEMFLAG == "X") {
			// 	ReviewNoOEMAvailableCheckBox.setSelected(true);
			// } else {
			// 	ReviewNoOEMAvailableCheckBox.setSelected(false);
			// }

			var shortText = oControllerObjReqCopyMat.getView().byId("idShortText_ReqCopyMat").getText();
			oControllerObjReviewReqCopyMat.getView().byId("idShortText_ReviewReqCopyMat").setText(shortText);

			var user_name_value = oControllerObjReqCopyMat.getView().byId("idinputusername_value_ReqCopyMat").getValue();
			//get value for input
			var user_name_req = oControllerObjReqCopyMat.getView().byId("idinputusername_label_ReqCopyMat").getRequired();
			//label required 
			oControllerObjReviewReqCopyMat.getView().byId("idinputusername_value_ReviewReqCopyMat").setText(user_name_value);
			// 
			var contact_value = oControllerObjReqCopyMat.getView().byId("idinputcontact_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputcontact_value_ReviewReqCopyMat").setText(contact_value);
			var contact_req = oControllerObjReqCopyMat.getView().byId("idinputcontact_label_ReqCopyMat").getRequired();
			var eol_flag_check = oControllerObjReqCopyMat.getView().byId("idEOLFLAG_value_ReqCopyMat").getSelected();
			oControllerObjReviewReqCopyMat.getView().byId("idEOLFLAG_value_ReviewReqCopyMat").setSelected(eol_flag_check);
			var eol_flag_check_req = oControllerObjReqCopyMat.getView().byId("idEOLFLAG_label_ReqCopyMat").getRequired();
			var plant_value = oControllerObjReqCopyMat.getView().byId("idplantinput_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idplantinput_value_ReviewReqCopyMat").setText(plant_value);
			var plant_req = oControllerObjReqCopyMat.getView().byId("idplantinput_label_ReqCopyMat").getRequired();
			var purchase_code_num_value = oControllerObjReqCopyMat.getView().byId("idinputpcn_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputpcn_value_ReviewReqCopyMat").setText(purchase_code_num_value);
			var purchase_code_num__req = oControllerObjReqCopyMat.getView().byId("idinputpcn_label_ReqCopyMat").getRequired();
			var buom_value = oControllerObjReqCopyMat.getView().byId("idBaseUOMinput_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idBaseUOMinput_value_ReviewReqCopyMat").setText(buom_value);
			var buom__req = oControllerObjReqCopyMat.getView().byId("idBaseUOMinput_label_ReqCopyMat").getRequired();
			var consumable_value = oControllerObjReqCopyMat.getView().byId("idcomboboxconsumable_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idcomboboxconsumable_value_ReviewReqCopyMat").setText(consumable_value);
			var consumable__req = oControllerObjReqCopyMat.getView().byId("idcomboboxconsumable_label_ReqCopyMat").getRequired();
			//mrp
			var forcast_per_period_value = oControllerObjReqCopyMat.getView().byId("idinputforecaseperiod_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputforecaseperiod_value_ReviewReqCopyMat").setText(forcast_per_period_value);
			var forcast_per_period__req = oControllerObjReqCopyMat.getView().byId("idinputforecaseperiod_label_ReqCopyMat").getRequired();
			var quality_batch_value = oControllerObjReqCopyMat.getView().byId("idinputquantityperbatch_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputquantityperbatch_value_ReviewReqCopyMat").setText(quality_batch_value);
			var quality_batch__req = oControllerObjReqCopyMat.getView().byId("idinputquantityperbatch_label_ReqCopyMat").getRequired();
			var cost_centre_value = oControllerObjReqCopyMat.getView().byId("idinputcostcenter_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputcostcenter_value_ReviewReqCopyMat").setText(cost_centre_value);
			var cost_centre__req = oControllerObjReqCopyMat.getView().byId("idinputcostcenter_label_ReqCopyMat").getRequired();
			var period_value = oControllerObjReqCopyMat.getView().byId("idinputperiod_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputperiod_value_ReviewReqCopyMat").setText(period_value);
			var period__req = oControllerObjReqCopyMat.getView().byId("idinputperiod_label_ReqCopyMat").getRequired();
			var storage_check = oControllerObjReqCopyMat.getView().byId("idcheckboxstoragronly_value_ReqCopyMat").getSelected();
			oControllerObjReviewReqCopyMat.getView().byId("idcheckboxstoragronly_value_ReviewReqCopyMat").setSelected(storage_check);
			var storage_check_req = oControllerObjReqCopyMat.getView().byId("idcheckboxstoragronly_label_ReqCopyMat").getRequired();
			var remark_forecast_value = oControllerObjReqCopyMat.getView().byId("idinputremarkforcast_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputremarkforcast_value_ReviewReqCopyMat").setText(remark_forecast_value);
			var remark_forecast_req = oControllerObjReqCopyMat.getView().byId("idinputremarkforcast_label_ReqCopyMat").getRequired();
			var repair_check = oControllerObjReqCopyMat.getView().byId("idcheckboxrepair_value_ReqCopyMat").getSelected();
			oControllerObjReviewReqCopyMat.getView().byId("idcheckboxrepair_value_ReviewReqCopyMat").setSelected(repair_check);
			var repair_check_req = oControllerObjReqCopyMat.getView().byId("idcheckboxrepair_label_ReqCopyMat").getRequired();
			
			//pur
			var oem_vendor_value = oControllerObjReqCopyMat.getView().byId("idinputfirstoemvendor_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputfirstoemvendor_value_ReviewReqCopyMat").setText(oem_vendor_value);
			var oem_vendor_req = oControllerObjReqCopyMat.getView().byId("idinputfirstoemvendor_label_ReqCopyMat").getRequired();
			var oem_part_value = oControllerObjReqCopyMat.getView().byId("idinputoempartfirst_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputoempartfirst_value_ReviewReqCopyMat").setText(oem_part_value);
			var oem_part_req = oControllerObjReqCopyMat.getView().byId("idinputoempartfirst_label_ReqCopyMat").getRequired();
			var sec_vendor_value = oControllerObjReqCopyMat.getView().byId("idinputsecondvendor_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputsecondvendor_value_ReviewReqCopyMat").setText(sec_vendor_value);
			var sec_vendor_req = oControllerObjReqCopyMat.getView().byId("idinputsecondvendor_label_ReqCopyMat").getRequired();
			var sec_part_value = oControllerObjReqCopyMat.getView().byId("idinputoempartsecond_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputoempartsecond_value_ReviewReqCopyMat").setText(sec_part_value);
			var sec_part_req = oControllerObjReqCopyMat.getView().byId("idinputoempartsecond_label_ReqCopyMat").getRequired();
			var critical_value = oControllerObjReqCopyMat.getView().byId("idinputcriticalpart_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputcriticalpart_value_ReviewReqCopyMat").setText(critical_value);
			var critical_req = oControllerObjReqCopyMat.getView().byId("idinputcriticalpart_label_ReqCopyMat").getRequired();

			//new req for adding third and fourth vendor and part number TB 28-1-19
			var third_oem_vendor_value = oControllerObjReqCopyMat.getView().byId("idinputthirdoemvendor_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputthirdoemvendor_value_ReviewReqCopyMat").setText(third_oem_vendor_value);
			var third_oem_part_value = oControllerObjReqCopyMat.getView().byId("idinputoempartthird_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputoempartthird_value_ReviewReqCopyMat").setText(third_oem_part_value);
			var fourth_vendor_value = oControllerObjReqCopyMat.getView().byId("idinputfourthvendor_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputfourthvendor_value_ReviewReqCopyMat").setText(fourth_vendor_value);
			var fourth_part_value = oControllerObjReqCopyMat.getView().byId("idinputoempartfourth_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputoempartfourth_value_ReviewReqCopyMat").setText(fourth_part_value);
			//new req for adding third and fourth vendor and part number TB 28-1-19

			//fin
			var profit_cen_value = oControllerObjReqCopyMat.getView().byId("idinputprofitcentre_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputprofitcentre_value_ReviewReqCopyMat").setText(profit_cen_value);
			var profit_cen_req = oControllerObjReqCopyMat.getView().byId("idinputprofitcentre_label_ReqCopyMat").getRequired();
			//wh
			var aut_serial_num_check = oControllerObjReqCopyMat.getView().byId("idcheckboxautserialno_value_ReqCopyMat").getSelected();
			oControllerObjReviewReqCopyMat.getView().byId("idcheckboxautserialno_value_ReviewReqCopyMat").setSelected(aut_serial_num_check);
			var aut_serial_num_check_req = oControllerObjReqCopyMat.getView().byId("idcheckboxautserialno_label_ReqCopyMat").getRequired();
			var UOI_value = oControllerObjReqCopyMat.getView().byId("idinputuoi_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputuoi_value_ReviewReqCopyMat").setText(UOI_value);
			var UOI_req = oControllerObjReqCopyMat.getView().byId("idinputuoi_label_ReqCopyMat").getRequired();
			var add_store_typ_value = oControllerObjReqCopyMat.getView().byId("addstoreinputid_value_ReqCopyMat").getTokens();
			oControllerObjReviewReqCopyMat.getView().byId("addstoreinputid_value_ReviewReqCopyMat").setTokens(add_store_typ_value);
			var add_store_typ_req = oControllerObjReqCopyMat.getView().byId("addstoreinputid_label_ReqCopyMat").getRequired();
			var serialnoproof_value = oControllerObjReqCopyMat.getView().byId("idinputserialnoprof_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputserialnoprof_value_ReviewReqCopyMat").setText(serialnoproof_value);
			var serialnoproof_req = oControllerObjReqCopyMat.getView().byId("idinputserialnoprof_label_ReqCopyMat").getRequired();
			var conversion_value = oControllerObjReqCopyMat.getView().byId("idinputconversion_value_ReqCopyMat").getValue();
			var conversion_value1 = oControllerObjReqCopyMat.getView().byId("idinputconversion_value1_ReqCopyMat").getValue();
			var conversion_valueDesc = oControllerObjReqCopyMat.getView().byId("idinputconversion_value_ReqCopyMat").getDescription();
			var conversion_value1Desc = oControllerObjReqCopyMat.getView().byId("idinputconversion_value1_ReqCopyMat").getDescription();
			var ConversionFinal = conversion_value + conversion_valueDesc + "=" + conversion_value1 + conversion_value1Desc;
			oControllerObjReviewReqCopyMat.getView().byId("idinputconversion_value_ReviewReqCopyMat").setText(ConversionFinal);
			var conversion_req = oControllerObjReqCopyMat.getView().byId("idinputconversion_label_ReqCopyMat").getRequired();
			var remarks_spec_hand_value = oControllerObjReqCopyMat.getView().byId("idinputremarks_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idinputremarks_value_ReviewReqCopyMat").setText(remarks_spec_hand_value);
			var remarks_spec_hand_req = oControllerObjReqCopyMat.getView().byId("idinputremarks_label_ReqCopyMat").getRequired();
			var serial_level_hand_value = oControllerObjReqCopyMat.getView().byId("idseriallevelinput_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idseriallevelinput_value_ReviewReqCopyMat").setText(serial_level_hand_value);
			var serial_level_req = oControllerObjReqCopyMat.getView().byId("idseriallevelinput_label_ReqCopyMat").getRequired();
			//qm
			var qua_insp_check = oControllerObjReqCopyMat.getView().byId("idcheckboxqualityinspect_value_ReqCopyMat").getSelected();
			oControllerObjReviewReqCopyMat.getView().byId("idcheckboxqualityinspect_value_ReviewReqCopyMat").setSelected(qua_insp_check);
			var qua_insp_req = oControllerObjReqCopyMat.getView().byId("idcheckboxqualityinspect_label_ReqCopyMat").getRequired();
			var batch_manag_check = oControllerObjReqCopyMat.getView().byId("idcheckboxbatchmanag_value_ReqCopyMat").getSelected();
			oControllerObjReviewReqCopyMat.getView().byId("idcheckboxbatchmanag_value_ReviewReqCopyMat").setSelected(batch_manag_check);
			var batch_manag_req = oControllerObjReqCopyMat.getView().byId("idcheckboxbatchmanag_label_ReqCopyMat").getRequired();
			var shel_life_check = oControllerObjReqCopyMat.getView().byId("idcheckboxshelfile_value_ReqCopyMat").getSelected();
			oControllerObjReviewReqCopyMat.getView().byId("idcheckboxshelfile_value_ReviewReqCopyMat").setSelected(shel_life_check);
			var shel_life_check_req = oControllerObjReqCopyMat.getView().byId("idcheckboxshelfile_label_ReqCopyMat").getRequired();

			if (storage_check == true) {
				this.byId("idinputperiod_label_ReviewReqCopyMat").setRequired(false);
				this.byId("idinputforecaseperiod_label_ReviewReqCopyMat").setRequired(false);

			} else {
				this.byId("idinputperiod_label_ReviewReqCopyMat").setRequired(true);
				this.byId("idinputforecaseperiod_label_ReviewReqCopyMat").setRequired(true);
			}
			if (aut_serial_num_check == true) {
				this.byId("idseriallevelinput_label_ReviewReqCopyMat").setRequired(true);
				this.byId("idinputserialnoprof_label_ReviewReqCopyMat").setRequired(true);
			} else {
				this.byId("idseriallevelinput_label_ReviewReqCopyMat").setRequired(false);
				this.byId("idinputserialnoprof_label_ReviewReqCopyMat").setRequired(false);
			}

			var ReqComment = oControllerObjReqCopyMat.getView().byId("idReqComment_value_ReqCopyMat").getValue();
			oControllerObjReviewReqCopyMat.getView().byId("idReqComment_value_ReviewReqCopyMat").setText(ReqComment);

			var oModelAttachment = oControllerObjReqCopyMat.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_COPY_MAT");
			var oAttachmentsLst = oControllerObjReviewReqCopyMat.byId("idAttachement_value_ReviewReqCopyMat");
			var oItemlistTempAttachment = new sap.m.ObjectListItem({
				type: "Active",
				title: "{ATTACHMENT_MODEL_REQ_COPY_MAT>fileName}", //title
				type: sap.m.ListType.Navigation,
				press: function (evt) {
					debugger;
					console.log(evt);
					var item = evt.getSource().sId.substr("-1");
					var oModelAttach = oControllerObjReqCopyMat.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_COPY_MAT");
					var URL = oModelAttach.getData().results[item].fileUrl;
					window.open(URL, '_blank');
				}

			});
			// oAttachmentsLst.setModel(oModelAttachment,"ATTACHMENT_MODEL_REQ_COPY_MAT");
			oAttachmentsLst.bindAggregation("items", "ATTACHMENT_MODEL_REQ_COPY_MAT>/results", oItemlistTempAttachment);
		},
		onPressSubmitReviewReqCopyMat: function (oEvent) {
			MaterialCreation.onSubmitMaterialCreationCopyMat(oControllerObjReqCopyMat, oControllerObjReviewReqCopyMat);

		},
		/**
		 *@memberOf z_app_spare_parts.z_spare_parts1.controller.ReviewReqCopyMaterial
		 */
	});
});
var that;
var oControllerObjReviewReqCopyMat;