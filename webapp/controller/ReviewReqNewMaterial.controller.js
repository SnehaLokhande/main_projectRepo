sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"z_app_spare_parts/z_spare_parts1/util/SubClassContent",
	"z_app_spare_parts/z_spare_parts1/util/SearchByClassification",
	"z_app_spare_parts/z_spare_parts1/util/MaterialCreation",

], function (Controller, MessageBox, Filter, SubClassContent, SearchByClassification, MaterialCreation) {
	//	"use strict";
	return Controller.extend("z_app_spare_parts.z_spare_parts1.controller.ReviewReqNewMaterial", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf z_app_spare_parts.z_spare_parts1.view.ReviewReqNewMaterial
		 */
		//	onInit: function() {
		//oControllerObjReviewReqNewMat
		//	},
		onPressBack: function (oEvent) {
			var add_store_typ_value = oControllerObjReviewReqNewMat.getView().byId("addstoreinputid_value_ReviewReqNewMat").getTokens();
			oControllerObjReqNewMat.getView().byId("addstoreinputid_value_ReqNewMat").setTokens(add_store_typ_value);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("NewMaterial");

		},
		onInit: function (oEvent) {
			that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("ReviewReqNewMaterial").attachPatternMatched(this.loadInitDataReviewReqNewMat, this);
		},
		loadInitDataReviewReqNewMat: function () {
			debugger;
			oControllerObjReviewReqNewMat = this;
			var ClassificationTree = oControllerObjReviewReqNewMat.getView().byId("idIconTabBarReviewRequestNewMaterial")
			ClassificationTree.destroyItems();
			/*iconTabBar = oControllerObjReqNewMat.byId("idIconTabBarRequestNewMaterial");
			oemuserInputValue = iconTabBar.getItems()[0].getContent()[0].getContent()[0].getItems()[1].getValue();
			var oemuserInputValue = oControllerObjReqNewMat.getView().byId("idIconTabBarRequestNewMaterial").getItems()[0].getContent()[0].getContent()[0].getItems()[1].getValue();
			var GridIconTabContent = new sap.ui.layout.Grid({
				defaultSpan: "XL6 L6 M6 S6",
				content: []
			});
			var HBox = new sap.m.HBox({
				items: [
					new sap.m.Label({
						text: "TEST_OEM_NUM",
						design:"Bold",
					}).addStyleClass("oDynamicLabelPadding"),
					new sap.m.Text({
						text: oemuserInputValue,
					}).addStyleClass("paddingforTextClassTree"),
				]
			});
			GridIconTabContent.addContent(HBox);

			ClassificationTree.addItem(new sap.m.IconTabFilter({
				visible: true,
				key: 0,
				icon: "sap-icon://hint",
				text: "TEST_SP",
				content: [
					GridIconTabContent,
				]
			}));*/
			SubClassContent.loadReviewReqNewMatJSONClassificationTree(oControllerObjReqNewMat, oControllerObjReviewReqNewMat);

			// oControllerObjReviewReqNewMat.getView().byId("idoempartNumber_value_ReviewReqNewMat").setText(oemuserInputValue);

			// var iconTabContent = oControllerObjReqNewMat.getView().byId("idIconTabBarRequestNewMaterial").getItems();
			// for(var i=0;i<iconTabContent.length;i++){
			// 	 oControllerObjReviewReqNewMat.getView().byId("idIconTabBarReviewRequestNewMaterial").addItem(iconTabContent[i]);
			// }
			// var ReviewNoOEMAvailableCheckBox = oControllerObjReviewReqNewMat.getView().byId("idBtnNoOemAvailable_ReviewReqNewMat");
			// if (oControllerObjReqNewMat.setNoOEMFLAG == "X") {
			// 	ReviewNoOEMAvailableCheckBox.setSelected(true);
			// } else {
			// 	ReviewNoOEMAvailableCheckBox.setSelected(false);
			// }

			var shortText = oControllerObjReqNewMat.getView().byId("idShortText_ReqNewMat").getText();
			oControllerObjReviewReqNewMat.getView().byId("idShortText_ReviewReqNewMat").setText(shortText);

			var user_name_value = oControllerObjReqNewMat.getView().byId("idinputusername_value_ReqNewMat").getValue();
			//get value for input
			var user_name_req = oControllerObjReqNewMat.getView().byId("idinputusername_label_ReqNewMat").getRequired();
			//label required 
			var user_name_value = oControllerObjReviewReqNewMat.getView().byId("idinputusername_value_ReviewReqNewMat").setText(user_name_value);
			// 
			var contact_value = oControllerObjReqNewMat.getView().byId("idinputcontact_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputcontact_value_ReviewReqNewMat").setText(contact_value);
			var contact_req = oControllerObjReqNewMat.getView().byId("idinputcontact_label_ReqNewMat").getRequired();
			var eol_flag_check = oControllerObjReqNewMat.getView().byId("idEOLFLAG_value_ReqNewMat").getSelected();
			oControllerObjReviewReqNewMat.getView().byId("idEOLFLAG_value_ReviewReqNewMat").setSelected(eol_flag_check);
			var eol_flag_check_req = oControllerObjReqNewMat.getView().byId("idEOLFLAG_label_ReqNewMat").getRequired();
			var plant_value = oControllerObjReqNewMat.getView().byId("idplantinput_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idplantinput_value_ReviewReqNewMat").setText(plant_value);
			var plant_req = oControllerObjReqNewMat.getView().byId("idplantinput_label_ReqNewMat").getRequired();
			var purchase_code_num_value = oControllerObjReqNewMat.getView().byId("idinputpcn_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputpcn_value_ReviewReqNewMat").setText(purchase_code_num_value);
			var purchase_code_num__req = oControllerObjReqNewMat.getView().byId("idinputpcn_label_ReqNewMat").getRequired();
			var buom_value = oControllerObjReqNewMat.getView().byId("idBaseUOMinput_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idBaseUOMinput_value_ReviewReqNewMat").setText(buom_value);
			var buom__req = oControllerObjReqNewMat.getView().byId("idBaseUOMinput_label_ReqNewMat").getRequired();
			var consumable_value = oControllerObjReqNewMat.getView().byId("idcomboboxconsumable_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idcomboboxconsumable_value_ReviewReqNewMat").setText(consumable_value);
			var consumable__req = oControllerObjReqNewMat.getView().byId("idcomboboxconsumable_label_ReqNewMat").getRequired();
			//mrp
			var forcast_per_period_value = oControllerObjReqNewMat.getView().byId("idinputforecaseperiod_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputforecaseperiod_value_ReviewReqNewMat").setText(forcast_per_period_value);
			var forcast_per_period__req = oControllerObjReqNewMat.getView().byId("idinputforecaseperiod_label_ReqNewMat").getRequired();
			var quality_batch_value = oControllerObjReqNewMat.getView().byId("idinputquantityperbatch_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputquantityperbatch_value_ReviewReqNewMat").setText(quality_batch_value);
			var quality_batch__req = oControllerObjReqNewMat.getView().byId("idinputquantityperbatch_label_ReqNewMat").getRequired();
			var cost_centre_value = oControllerObjReqNewMat.getView().byId("idinputcostcenter_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputcostcenter_value_ReviewReqNewMat").setText(cost_centre_value);
			var cost_centre__req = oControllerObjReqNewMat.getView().byId("idinputcostcenter_label_ReqNewMat").getRequired();
			var period_value = oControllerObjReqNewMat.getView().byId("idinputperiod_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputperiod_value_ReviewReqNewMat").setText(period_value);
			var period__req = oControllerObjReqNewMat.getView().byId("idinputperiod_label_ReqNewMat").getRequired();
			var storage_check = oControllerObjReqNewMat.getView().byId("idcheckboxstoragronly_value_ReqNewMat").getSelected();
			oControllerObjReviewReqNewMat.getView().byId("idcheckboxstoragronly_value_ReviewReqNewMat").setSelected(storage_check);
			var storage_check_req = oControllerObjReqNewMat.getView().byId("idcheckboxstoragronly_label_ReqNewMat").getRequired();
			var repair_check = oControllerObjReqNewMat.getView().byId("idcheckboxrepair_value_ReqNewMat").getSelected();
			oControllerObjReviewReqNewMat.getView().byId("idcheckboxrepair_value_ReviewReqNewMat").setSelected(repair_check);

			var remark_forecast_value = oControllerObjReqNewMat.getView().byId("idinputremarkforcast_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputremarkforcast_value_ReviewReqNewMat").setText(remark_forecast_value);
			var remark_forecast_req = oControllerObjReqNewMat.getView().byId("idinputremarkforcast_label_ReqNewMat").getRequired();
			var repair_check = oControllerObjReqNewMat.getView().byId("idcheckboxrepair_value_ReqNewMat").getSelected();
			oControllerObjReviewReqNewMat.getView().byId("idcheckboxrepair_value_ReviewReqNewMat").setSelected(repair_check);
			var repair_check_req = oControllerObjReqNewMat.getView().byId("idcheckboxrepair_label_ReqNewMat").getRequired();
			//pur
			var oem_vendor_value = oControllerObjReqNewMat.getView().byId("idinputfirstoemvendor_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputfirstoemvendor_value_ReviewReqNewMat").setText(oem_vendor_value);
			var oem_vendor_req = oControllerObjReqNewMat.getView().byId("idinputfirstoemvendor_label_ReqNewMat").getRequired();
			var oem_part_value = oControllerObjReqNewMat.getView().byId("idinputoempartfirst_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputoempartfirst_value_ReviewReqNewMat").setText(oem_part_value);
			var oem_part_req = oControllerObjReqNewMat.getView().byId("idinputoempartfirst_label_ReqNewMat").getRequired();
			var sec_vendor_value = oControllerObjReqNewMat.getView().byId("idinputsecondvendor_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputsecondvendor_value_ReviewReqNewMat").setText(sec_vendor_value);
			var sec_vendor_req = oControllerObjReqNewMat.getView().byId("idinputsecondvendor_label_ReqNewMat").getRequired();
			var sec_part_value = oControllerObjReqNewMat.getView().byId("idinputoempartsecond_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputoempartsecond_value_ReviewReqNewMat").setText(sec_part_value);
			var sec_part_req = oControllerObjReqNewMat.getView().byId("idinputoempartsecond_label_ReqNewMat").getRequired();

			//new req for adding third and fourth vendor and part number TB 28-1-19
			var third_oem_vendor_value = oControllerObjReqNewMat.getView().byId("idinputthirdoemvendor_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputthirdoemvendor_value_ReviewReqNewMat").setText(third_oem_vendor_value);
			var third_oem_part_value = oControllerObjReqNewMat.getView().byId("idinputoempartthird_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputoempartthird_value_ReviewReqNewMat").setText(third_oem_part_value);
			var fourth_vendor_value = oControllerObjReqNewMat.getView().byId("idinputfourthvendor_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputfourthvendor_value_ReviewReqNewMat").setText(fourth_vendor_value);
			var fourth_part_value = oControllerObjReqNewMat.getView().byId("idinputoempartfourth_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputoempartfourth_value_ReviewReqNewMat").setText(fourth_part_value);
			//new req for adding third and fourth vendor and part number TB 28-1-19

			var critical_value = oControllerObjReqNewMat.getView().byId("idinputcriticalpart_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputcriticalpart_value_ReviewReqNewMat").setText(critical_value);
			var critical_req = oControllerObjReqNewMat.getView().byId("idinputcriticalpart_label_ReqNewMat").getRequired();
			//fin
			var profit_cen_value = oControllerObjReqNewMat.getView().byId("idinputprofitcentre_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputprofitcentre_value_ReviewReqNewMat").setText(profit_cen_value);
			var profit_cen_req = oControllerObjReqNewMat.getView().byId("idinputprofitcentre_label_ReqNewMat").getRequired();
			//wh
			var aut_serial_num_check = oControllerObjReqNewMat.getView().byId("idcheckboxautserialno_value_ReqNewMat").getSelected();
			oControllerObjReviewReqNewMat.getView().byId("idcheckboxautserialno_value_ReviewReqNewMat").setSelected(aut_serial_num_check);
			var aut_serial_num_check_req = oControllerObjReqNewMat.getView().byId("idcheckboxautserialno_label_ReqNewMat").getRequired();
			var UOI_value = oControllerObjReqNewMat.getView().byId("idinputuoi_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputuoi_value_ReviewReqNewMat").setText(UOI_value);
			var UOI_req = oControllerObjReqNewMat.getView().byId("idinputuoi_label_ReqNewMat").getRequired();
			var add_store_typ_value = oControllerObjReqNewMat.getView().byId("addstoreinputid_value_ReqNewMat").getTokens();
			oControllerObjReviewReqNewMat.getView().byId("addstoreinputid_value_ReviewReqNewMat").setTokens(add_store_typ_value);
			var add_store_typ_req = oControllerObjReqNewMat.getView().byId("addstoreinputid_label_ReqNewMat").getRequired();
			var serialnoproof_value = oControllerObjReqNewMat.getView().byId("idinputserialnoprof_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputserialnoprof_value_ReviewReqNewMat").setText(serialnoproof_value);
			var serialnoproof_req = oControllerObjReqNewMat.getView().byId("idinputserialnoprof_label_ReqNewMat").getRequired();
			var conversion_value = oControllerObjReqNewMat.getView().byId("idinputconversion_value_ReqNewMat").getValue();
			var conversion_value1 = oControllerObjReqNewMat.getView().byId("idinputconversion_value1_ReqNewMat").getValue();
			var conversion_valueDesc = oControllerObjReqNewMat.getView().byId("idinputconversion_value_ReqNewMat").getDescription();
			var conversion_value1Desc = oControllerObjReqNewMat.getView().byId("idinputconversion_value1_ReqNewMat").getDescription();
			var ConversionFinal = conversion_value + conversion_valueDesc + "=" + conversion_value1 + conversion_value1Desc;
			oControllerObjReviewReqNewMat.getView().byId("idinputconversion_value_ReviewReqNewMat").setText(ConversionFinal);
			var conversion_req = oControllerObjReqNewMat.getView().byId("idinputconversion_label_ReqNewMat").getRequired();
			var remarks_spec_hand_value = oControllerObjReqNewMat.getView().byId("idinputremarks_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idinputremarks_value_ReviewReqNewMat").setText(remarks_spec_hand_value);
			var remarks_spec_hand_req = oControllerObjReqNewMat.getView().byId("idinputremarks_label_ReqNewMat").getRequired();
			var serial_level_hand_value = oControllerObjReqNewMat.getView().byId("idseriallevelinput_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idseriallevelinput_value_ReviewReqNewMat").setText(serial_level_hand_value);
			var serial_level_req = oControllerObjReqNewMat.getView().byId("idseriallevelinput_label_ReqNewMat").getRequired();
			//qm
			var qua_insp_check = oControllerObjReqNewMat.getView().byId("idcheckboxqualityinspect_value_ReqNewMat").getSelected();
			oControllerObjReviewReqNewMat.getView().byId("idcheckboxqualityinspect_value_ReviewReqNewMat").setSelected(qua_insp_check);
			var qua_insp_req = oControllerObjReqNewMat.getView().byId("idcheckboxqualityinspect_label_ReqNewMat").getRequired();
			var batch_manag_check = oControllerObjReqNewMat.getView().byId("idcheckboxbatchmanag_value_ReqNewMat").getSelected();
			oControllerObjReviewReqNewMat.getView().byId("idcheckboxbatchmanag_value_ReviewReqNewMat").setSelected(batch_manag_check);
			var batch_manag_req = oControllerObjReqNewMat.getView().byId("idcheckboxbatchmanag_label_ReqNewMat").getRequired();
			var shel_life_check = oControllerObjReqNewMat.getView().byId("idcheckboxshelfile_value_ReqNewMat").getSelected();
			oControllerObjReviewReqNewMat.getView().byId("idcheckboxshelfile_value_ReviewReqNewMat").setSelected(shel_life_check);
			var shel_life_check_req = oControllerObjReqNewMat.getView().byId("idcheckboxshelfile_label_ReqNewMat").getRequired();

			if (storage_check == true) {
				this.byId("idinputperiod_label_ReviewReqNewMat").setRequired(false);
				this.byId("idinputforecaseperiod_label_ReviewReqNewMat").setRequired(false);

			} else {
				this.byId("idinputperiod_label_ReviewReqNewMat").setRequired(true);
				this.byId("idinputforecaseperiod_label_ReviewReqNewMat").setRequired(true);
			}
			if (aut_serial_num_check == true) {
				this.byId("idseriallevelinput_label_ReviewReqNewMat").setRequired(true);
				this.byId("idinputserialnoprof_label_ReviewReqNewMat").setRequired(true);
			} else {
				this.byId("idseriallevelinput_label_ReviewReqNewMat").setRequired(false);
				this.byId("idinputserialnoprof_label_ReviewReqNewMat").setRequired(false);
			}

			var ReqComment = oControllerObjReqNewMat.getView().byId("idReqComment_value_ReqNewMat").getValue();
			oControllerObjReviewReqNewMat.getView().byId("idReqComment_value_ReviewReqNewMat").setText(ReqComment);

			var oModelAttachment = oControllerObjReqNewMat.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_NEW_MAT");
			var oAttachmentsLst = oControllerObjReviewReqNewMat.byId("idAttachement_value_ReviewReqNewMat");
			var oItemlistTempAttachment = new sap.m.ObjectListItem({
				type: "Active",
				title: "{ATTACHMENT_MODEL_REQ_NEW_MAT>fileName}", //title
				type: sap.m.ListType.Navigation,
				press: function (evt) {
					debugger;
					console.log(evt);
					var item = evt.getSource().sId.substr("-1");
					var oModelAttach = oControllerObjReqNewMat.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_NEW_MAT");
					var URL = oModelAttach.getData().results[item].fileUrl;
					window.open(URL, '_blank');
				}

			});
			// oAttachmentsLst.setModel(oModelAttachment,"ATTACHMENT_MODEL_REQ_NEW_MAT");
			oAttachmentsLst.bindAggregation("items", "ATTACHMENT_MODEL_REQ_NEW_MAT>/results", oItemlistTempAttachment);
		},
		onPressSubmitReviewReqNewMat: function (oEvent) {
			MaterialCreation.onSubmitMaterialCreation(oControllerObjReqNewMat, oControllerObjReviewReqNewMat);

		},
		/**
		 *@memberOf z_app_spare_parts.z_spare_parts1.controller.ReviewReqNewMaterial
		 */
		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		}
	});
});
var that;
var oControllerObjReviewReqNewMat;