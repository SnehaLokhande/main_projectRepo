sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"z_app_spare_parts/z_spare_parts1/util/SubClassContent",
	"z_app_spare_parts/z_spare_parts1/util/SearchByClassification",
	"z_app_spare_parts/z_spare_parts1/util/MaterialCreation",

], function (Controller, MessageBox, Filter, SubClassContent, SearchByClassification, MaterialCreation) {
	return Controller.extend("z_app_spare_parts.z_spare_parts1.controller.ReviewPlantExtension", {
		onInit: function (oEvent) {
			debugger;
			oControllerObjReviewPlantExtension = this;
			that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("ReviewPlantExtension").attachPatternMatched(this.loadInitDataReviewPlantExtension, this);
		},
		loadInitDataReviewPlantExtension: function () {
			debugger;
			// oControllerObjReviewPlantExtension = this;

			var user_name_value = oControllerObjPlantExtension.getView().byId("idinputusername_value_PlantExtension").getValue();
			//get value for input
			var user_name_req = oControllerObjPlantExtension.getView().byId("idinputusername_label_PlantExtension").getRequired();
			//label required 
			oControllerObjReviewPlantExtension.getView().byId("idinputusername_value_ReviewPlantExtension").setText(user_name_value);
			// 
			var contact_value = oControllerObjPlantExtension.getView().byId("idinputcontact_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputcontact_value_ReviewPlantExtension").setText(contact_value);
			var contact_req = oControllerObjPlantExtension.getView().byId("idinputcontact_label_PlantExtension").getRequired();
			var eol_flag_check = oControllerObjPlantExtension.getView().byId("idEOLFLAG_value_PlantExtension").getSelected();
			oControllerObjReviewPlantExtension.getView().byId("idEOLFLAG_value_ReviewPlantExtension").setSelected(eol_flag_check);
			var eol_flag_check_req = oControllerObjPlantExtension.getView().byId("idEOLFLAG_label_PlantExtension").getRequired();
			var plant_value = oControllerObjPlantExtension.getView().byId("idplantinput_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idplantinput_value_ReviewPlantExtension").setText(plant_value);
			var plant_req = oControllerObjPlantExtension.getView().byId("idplantinput_label_PlantExtension").getRequired();
			var purchase_code_num_value = oControllerObjPlantExtension.getView().byId("idinputpcn_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputpcn_value_ReviewPlantExtension").setText(purchase_code_num_value);
			var purchase_code_num__req = oControllerObjPlantExtension.getView().byId("idinputpcn_label_PlantExtension").getRequired();
			var buom_value = oControllerObjPlantExtension.getView().byId("idBaseUOMinput_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idBaseUOMinput_value_ReviewPlantExtension").setText(buom_value);
			var buom__req = oControllerObjPlantExtension.getView().byId("idBaseUOMinput_label_PlantExtension").getRequired();
			var consumable_value = oControllerObjPlantExtension.getView().byId("idcomboboxconsumable_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idcomboboxconsumable_value_ReviewPlantExtension").setText(consumable_value);
			var consumable__req = oControllerObjPlantExtension.getView().byId("idcomboboxconsumable_label_PlantExtension").getRequired();
			//mrp
			var forcast_per_period_value = oControllerObjPlantExtension.getView().byId("idinputforecaseperiod_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputforecaseperiod_value_ReviewPlantExtension").setText(
				forcast_per_period_value);
			var forcast_per_period__req = oControllerObjPlantExtension.getView().byId("idinputforecaseperiod_label_PlantExtension").getRequired();
			var quality_batch_value = oControllerObjPlantExtension.getView().byId("idinputquantityperbatch_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputquantityperbatch_value_ReviewPlantExtension").setText(quality_batch_value);
			var quality_batch__req = oControllerObjPlantExtension.getView().byId("idinputquantityperbatch_label_PlantExtension").getRequired();
			var cost_centre_value = oControllerObjPlantExtension.getView().byId("idinputcostcenter_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputcostcenter_value_ReviewPlantExtension").setText(cost_centre_value);
			var cost_centre__req = oControllerObjPlantExtension.getView().byId("idinputcostcenter_label_PlantExtension").getRequired();
			var period_value = oControllerObjPlantExtension.getView().byId("idinputperiod_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputperiod_value_ReviewPlantExtension").setText(period_value);
			var period__req = oControllerObjPlantExtension.getView().byId("idinputperiod_label_PlantExtension").getRequired();
			var storage_check = oControllerObjPlantExtension.getView().byId("idcheckboxstoragronly_value_PlantExtension").getSelected();
			oControllerObjReviewPlantExtension.getView().byId("idcheckboxstoragronly_value_ReviewPlantExtension").setSelected(storage_check);
			var storage_check_req = oControllerObjPlantExtension.getView().byId("idcheckboxstoragronly_label_PlantExtension").getRequired();
			var remark_forecast_value = oControllerObjPlantExtension.getView().byId("idinputremarkforcast_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputremarkforcast_value_ReviewPlantExtension").setText(remark_forecast_value);
			var remark_forecast_req = oControllerObjPlantExtension.getView().byId("idinputremarkforcast_label_PlantExtension").getRequired();
			var repair_check = oControllerObjPlantExtension.getView().byId("idcheckboxrepair_value_PlantExtension").getSelected();
			oControllerObjReviewPlantExtension.getView().byId("idcheckboxrepair_value_ReviewPlantExtension").setSelected(repair_check);
			var repair_check_req = oControllerObjPlantExtension.getView().byId("idcheckboxrepair_label_PlantExtension").getRequired();
			//pur
			var oem_vendor_value = oControllerObjPlantExtension.getView().byId("idinputfirstoemvendor_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputfirstoemvendor_value_ReviewPlantExtension").setText(oem_vendor_value);
			var oem_vendor_req = oControllerObjPlantExtension.getView().byId("idinputfirstoemvendor_label_PlantExtension").getRequired();
			var oem_part_value = oControllerObjPlantExtension.getView().byId("idinputoempartfirst_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputoempartfirst_value_ReviewPlantExtension").setText(oem_part_value);
			var oem_part_req = oControllerObjPlantExtension.getView().byId("idinputoempartfirst_label_PlantExtension").getRequired();
			var sec_vendor_value = oControllerObjPlantExtension.getView().byId("idinputsecondvendor_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputsecondvendor_value_ReviewPlantExtension").setText(sec_vendor_value);
			var sec_vendor_req = oControllerObjPlantExtension.getView().byId("idinputsecondvendor_label_PlantExtension").getRequired();
			var sec_part_value = oControllerObjPlantExtension.getView().byId("idinputoempartsecond_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputoempartsecond_value_ReviewPlantExtension").setText(sec_part_value);
			var sec_part_req = oControllerObjPlantExtension.getView().byId("idinputoempartsecond_label_PlantExtension").getRequired();
			var critical_value = oControllerObjPlantExtension.getView().byId("idinputcriticalpart_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputcriticalpart_value_ReviewPlantExtension").setText(critical_value);
			var critical_req = oControllerObjPlantExtension.getView().byId("idinputcriticalpart_label_PlantExtension").getRequired();

			//new req for adding third and fourth vendor and part number TB 28-1-19
			var third_oem_vendor_value = oControllerObjPlantExtension.getView().byId("idinputthirdoemvendor_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputthirdoemvendor_value_ReviewPlantExtension").setText(
				third_oem_vendor_value);
			var third_oem_part_value = oControllerObjPlantExtension.getView().byId("idinputoempartthird_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputoempartthird_value_ReviewPlantExtension").setText(third_oem_part_value);
			var fourth_vendor_value = oControllerObjPlantExtension.getView().byId("idinputfourthvendor_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputfourthvendor_value_ReviewPlantExtension").setText(fourth_vendor_value);
			var fourth_part_value = oControllerObjPlantExtension.getView().byId("idinputoempartfourth_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputoempartfourth_value_ReviewPlantExtension").setText(fourth_part_value);
			//new req for adding third and fourth vendor and part number TB 28-1-19

			//fin
			var profit_cen_value = oControllerObjPlantExtension.getView().byId("idinputprofitcentre_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputprofitcentre_value_ReviewPlantExtension").setText(profit_cen_value);
			var profit_cen_req = oControllerObjPlantExtension.getView().byId("idinputprofitcentre_label_PlantExtension").getRequired();
			//wh
			var aut_serial_num_check = oControllerObjPlantExtension.getView().byId("idcheckboxautserialno_value_PlantExtension").getSelected();
			oControllerObjReviewPlantExtension.getView().byId("idcheckboxautserialno_value_ReviewPlantExtension").setSelected(
				aut_serial_num_check);
			var aut_serial_num_check_req = oControllerObjPlantExtension.getView().byId("idcheckboxautserialno_label_PlantExtension").getRequired();
			var UOI_value = oControllerObjPlantExtension.getView().byId("idinputuoi_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputuoi_value_ReviewPlantExtension").setText(UOI_value);
			var UOI_req = oControllerObjPlantExtension.getView().byId("idinputuoi_label_PlantExtension").getRequired();
			var add_store_typ_value = oControllerObjPlantExtension.getView().byId("addstoreinputid_value_PlantExtension").getTokens();
			oControllerObjReviewPlantExtension.getView().byId("addstoreinputid_value_ReviewPlantExtension").setTokens(add_store_typ_value);
			var add_store_typ_req = oControllerObjPlantExtension.getView().byId("addstoreinputid_label_PlantExtension").getRequired();
			var serialnoproof_value = oControllerObjPlantExtension.getView().byId("idinputserialnoprof_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputserialnoprof_value_ReviewPlantExtension").setText(serialnoproof_value);
			var serialnoproof_req = oControllerObjPlantExtension.getView().byId("idinputserialnoprof_label_PlantExtension").getRequired();
			var conversion_value = oControllerObjPlantExtension.getView().byId("idinputconversion_value_PlantExtension").getValue();
			var conversion_value1 = oControllerObjPlantExtension.getView().byId("idinputconversion_value1_PlantExtension").getValue();
			var conversion_valueDesc = oControllerObjPlantExtension.getView().byId("idinputconversion_value_PlantExtension").getDescription();
			var conversion_value1Desc = oControllerObjPlantExtension.getView().byId("idinputconversion_value1_PlantExtension").getDescription();
			var ConversionFinal = conversion_value + conversion_valueDesc + "=" + conversion_value1 + conversion_value1Desc;
			oControllerObjReviewPlantExtension.getView().byId("idinputconversion_value_ReviewPlantExtension").setText(ConversionFinal);

			var conversion_req = oControllerObjPlantExtension.getView().byId("idinputconversion_label_PlantExtension").getRequired();
			var remarks_spec_hand_value = oControllerObjPlantExtension.getView().byId("idinputremarks_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idinputremarks_value_ReviewPlantExtension").setText(remarks_spec_hand_value);
			var remarks_spec_hand_req = oControllerObjPlantExtension.getView().byId("idinputremarks_label_PlantExtension").getRequired();
			var serial_level_hand_value = oControllerObjPlantExtension.getView().byId("idseriallevelinput_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idseriallevelinput_value_ReviewPlantExtension").setText(serial_level_hand_value);
			var serial_level_req = oControllerObjPlantExtension.getView().byId("idseriallevelinput_label_PlantExtension").getRequired();
			//qm
			var qua_insp_check = oControllerObjPlantExtension.getView().byId("idcheckboxqualityinspect_value_PlantExtension").getSelected();
			oControllerObjReviewPlantExtension.getView().byId("idcheckboxqualityinspect_value_ReviewPlantExtension").setSelected(qua_insp_check);
			var qua_insp_req = oControllerObjPlantExtension.getView().byId("idcheckboxqualityinspect_label_PlantExtension").getRequired();
			var batch_manag_check = oControllerObjPlantExtension.getView().byId("idcheckboxbatchmanag_value_PlantExtension").getSelected();
			oControllerObjReviewPlantExtension.getView().byId("idcheckboxbatchmanag_value_ReviewPlantExtension").setSelected(batch_manag_check);
			var batch_manag_req = oControllerObjPlantExtension.getView().byId("idcheckboxbatchmanag_label_PlantExtension").getRequired();
			var shel_life_check = oControllerObjPlantExtension.getView().byId("idcheckboxshelfile_value_PlantExtension").getSelected();
			oControllerObjReviewPlantExtension.getView().byId("idcheckboxshelfile_value_ReviewPlantExtension").setSelected(shel_life_check);
			var shel_life_check_req = oControllerObjPlantExtension.getView().byId("idcheckboxshelfile_label_PlantExtension").getRequired();

			if (storage_check == true) {
				this.byId("idinputperiod_label_ReviewPlantExtension").setRequired(false);
				this.byId("idinputforecaseperiod_label_ReviewPlantExtension").setRequired(false);

			} else {
				this.byId("idinputperiod_label_ReviewPlantExtension").setRequired(true);
				this.byId("idinputforecaseperiod_label_ReviewPlantExtension").setRequired(true);
			}
			if (aut_serial_num_check == true) {
				this.byId("idseriallevelinput_label_ReviewPlantExtension").setRequired(true);
				this.byId("idinputserialnoprof_label_ReviewPlantExtension").setRequired(true);
			} else {
				this.byId("idseriallevelinput_label_ReviewPlantExtension").setRequired(false);
				this.byId("idinputserialnoprof_label_ReviewPlantExtension").setRequired(false);
			}

			var ReqComment = oControllerObjPlantExtension.getView().byId("idReqComment_value_PlantExtension").getValue();
			oControllerObjReviewPlantExtension.getView().byId("idReqComment_value_ReviewPlantExtension").setText(ReqComment);

			var oModelAttachment = oControllerObjPlantExtension.getOwnerComponent().getModel("ATTACHMENT_MODEL_PLANT_EXT");
			var oAttachmentsLst = oControllerObjReviewPlantExtension.byId("idAttachement_value_ReviewPlantExtension");
			var oItemlistTempAttachment = new sap.m.ObjectListItem({
				type: "Active",
				title: "{ATTACHMENT_MODEL_PLANT_EXT>fileName}", //title
				type: sap.m.ListType.Navigation,
				press: function (evt) {
					debugger;
					console.log(evt);
					var item = evt.getSource().sId.substr("-1");
					var oModelAttach = oControllerObjPlantExtension.getOwnerComponent().getModel("ATTACHMENT_MODEL_PLANT_EXT");
					var URL = oModelAttach.getData().results[item].fileUrl;
					window.open(URL, '_blank');
				}

			});
			// oAttachmentsLst.setModel(oModelAttachment,"ATTACHMENT_MODEL_REQ_COPY_MAT");
			oAttachmentsLst.bindAggregation("items", "ATTACHMENT_MODEL_PLANT_EXT>/results", oItemlistTempAttachment);
		},
		_onFioriObjectPageHeaderPress: function (oEvent) {
			debugger;
			var add_store_typ_value = oControllerObjReviewPlantExtension.getView().byId("addstoreinputid_value_ReviewPlantExtension").getTokens();
			oControllerObjPlantExtension.getView().byId("addstoreinputid_value_PlantExtension").setTokens(add_store_typ_value);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Plantextension");
		},
		onPressSubmitReviewPlantExtension: function (oEvent) {
			debugger;
			MaterialCreation.onSubmitPlantExtension(oControllerObjPlantExtension, oControllerObjReviewPlantExtension);
		},
		/**
		 *@memberOf z_app_spare_parts.z_spare_parts1.controller.ReviewPlantExtension
		 */
	});
});
var oControllerObjReviewPlantExtension;