jQuery.sap.declare("z_app_spare_parts.z_spare_parts1.util.InputMatInformation");
z_app_spare_parts.z_spare_parts1.util.InputMatInformation = {};

var busyDialog = new sap.m.BusyDialog();

z_app_spare_parts.z_spare_parts1.util.InputMatInformation.getInputMatInformationReqNewMat = function (that) {

		debugger;

		var classTreeJSON = that.ClassificationTreeJSON.results;
		var Class;
		var CharName;
		var CharVal;
		var Atkla;
		var New;
		var Mandatory;
		var ShortTextRel;
		var Atfor;

		for (var c = 0; c < classTreeJSON.length; c++) {

			for (var d = 0; d < classTreeJSON[c].ET_CLASS_CHARNav.results.length; d++) {

				Class = classTreeJSON[c].Class;
				CharVal = classTreeJSON[c].ET_CLASS_CHARNav.results[d].DEFVALUE;
				CharName = classTreeJSON[c].ET_CLASS_CHARNav.results[d].NAME;
				Atkla = classTreeJSON[c].ET_CLASS_CHARNav.results[d].Atkla;
				New = classTreeJSON[c].ET_CLASS_CHARNav.results[d].NEW;
				Leaf = classTreeJSON[c].LEAF;
				Mandatory = classTreeJSON[c].ET_CLASS_CHARNav.results[d].MANDATORY;
				ShortTextRel = classTreeJSON[c].ET_CLASS_CHARNav.results[d].SHORTTEXTREL;
				Atfor = classTreeJSON[c].ET_CLASS_CHARNav.results[d].DATATYP;

				that.ClassificationTreeJSONFlatStrc = {

					results: []

				};

				that.ClassificationTreeJSONFlatStrc.results.push({
					Class: Class,
					Atnam: CharName,
					Atwrt: CharVal,
					Atkla: Atkla,
					New: New,
					Mandatory: Mandatory,
					ShortTextRel: ShortTextRel,
					Leaf: Leaf,
					Atfor: Atfor
				});

			}

		}

	},

	z_app_spare_parts.z_spare_parts1.util.InputMatInformation.reviewInputMatInformationReqNewMat = function (that) {

		debugger;

		var user_name_value = that.getView().byId("idinputusername_value_ReqNewMat").getValue(); //get value for input

		var user_name_req = that.getView().byId("idinputusername_label_ReqNewMat").getRequired(); //label required

		var contact_value = that.getView().byId("idinputcontact_value_ReqNewMat").getValue();

		var contact_req = that.getView().byId("idinputcontact_label_ReqNewMat").getRequired();

		var eol_flag_check = that.getView().byId("idEOLFLAG_value_ReqNewMat").getSelected();

		var eol_flag_check_req = that.getView().byId("idEOLFLAG_label_ReqNewMat").getRequired();

		var plant_value = that.getView().byId("idplantinput_value_ReqNewMat").getValue();

		var plant_req = that.getView().byId("idplantinput_label_ReqNewMat").getRequired();

		if (plant_req == true) {

			if (plant_value == "") {

				that.getView().byId("idplantinput_value_ReqNewMat").setValueState("Error");

				that.reviewFlag_ReqNewMat = false;

			} else {

				that.getView().byId("idplantinput_value_ReqNewMat").setValueState("None");

			}

		}

		var purchase_code_num_value = that.getView().byId("idinputpcn_value_ReqNewMat").getValue();

		var purchase_code_num__req = that.getView().byId("idinputpcn_label_ReqNewMat").getRequired();

		if (purchase_code_num__req == true) {

			if (purchase_code_num_value == "") {

				that.getView().byId("idinputpcn_value_ReqNewMat").setValueState("Error");

				that.reviewFlag_ReqNewMat = false;

			} else {

				that.getView().byId("idinputpcn_value_ReqNewMat").setValueState("None");

			}

		}

		var buom_value = that.getView().byId("idBaseUOMinput_value_ReqNewMat").getValue();

		var buom__req = that.getView().byId("idBaseUOMinput_label_ReqNewMat").getRequired();

		if (buom__req == true) {

			if (buom_value == "") {

				that.getView().byId("idBaseUOMinput_value_ReqNewMat").setValueState("Error");

				that.reviewFlag_ReqNewMat = false;

			} else {

				that.getView().byId("idBaseUOMinput_value_ReqNewMat").setValueState("None");

			}

		}

		var consumable_value = that.getView().byId("idcomboboxconsumable_value_ReqNewMat").getValue();

		var consumable__req = that.getView().byId("idcomboboxconsumable_label_ReqNewMat").getRequired();

		if (consumable__req == true) {

			if (consumable_value == "") {

				that.getView().byId("idcomboboxconsumable_value_ReqNewMat").setValueState("Error");

				that.reviewFlag_ReqNewMat = false;

			} else {

				that.getView().byId("idcomboboxconsumable_value_ReqNewMat").setValueState("None");

			}

		}

		//mrp

		var forcast_per_period_value = that.getView().byId("idinputforecaseperiod_value_ReqNewMat").getValue();
		if (forcast_per_period_value == 0 && storage_check == false) {

			that.getView().byId("idinputforecaseperiod_value_ReqNewMat").setValueState("Error");
			that.getView().byId("idinputforecaseperiod_value_ReqNewMat").setValueStateText("Value Cannot be Zero");

			sap.m.MessageBox.error(" Value Cannot be Zero for Forecast period");

			that.reviewFlag_ReqNewMat = false;

		} else {

			that.getView().byId("idinputforecaseperiod_value_ReqNewMat").setValueState("None");
			that.getView().byId("idinputforecaseperiod_value_ReqNewMat").setValueStateText("");

		}

		var forcast_per_period__req = that.getView().byId("idinputforecaseperiod_label_ReqNewMat").getRequired();

		var quality_batch_value = that.getView().byId("idinputquantityperbatch_value_ReqNewMat").getValue();

		var quality_batch__req = that.getView().byId("idinputquantityperbatch_label_ReqNewMat").getRequired();

		var cost_centre_value = that.getView().byId("idinputcostcenter_value_ReqNewMat").getValue();

		var cost_centre__req = that.getView().byId("idinputcostcenter_label_ReqNewMat").getRequired();

		var period_value = that.getView().byId("idinputperiod_value_ReqNewMat").getValue();

		var period__req = that.getView().byId("idinputperiod_label_ReqNewMat").getRequired();

		var storage_check = that.getView().byId("idcheckboxstoragronly_value_ReqNewMat").getSelected();

		var storage_check_req = that.getView().byId("idcheckboxstoragronly_label_ReqNewMat").getRequired();

		// if (storage_check_req == true) {

		if (storage_check == false) {

			if (forcast_per_period_value == "" && period_value == "") {
				that.getView().byId("idinputforecaseperiod_value_ReqNewMat").setValueState("Error");
				that.getView().byId("idinputperiod_value_ReqNewMat").setValueState("Error");
				that.reviewFlag_ReqNewMat = false;
			} else if (forcast_per_period_value == "") {
				that.getView().byId("idinputforecaseperiod_value_ReqNewMat").setValueState("Error");
				that.reviewFlag_ReqNewMat = false;
			} else if (period_value == "") {
				that.getView().byId("idinputperiod_value_ReqNewMat").setValueState("Error");
				that.reviewFlag_ReqNewMat = false;
			} else {
				that.getView().byId("idinputforecaseperiod_value_ReqNewMat").setValueState("None");
				that.getView().byId("idinputperiod_value_ReqNewMat").setValueState("None");
			}

		} else {

			that.getView().byId("idinputforecaseperiod_value_ReqNewMat").setValueState("None");

			that.getView().byId("idinputperiod_value_ReqNewMat").setValueState("None");

		}

		// }

		var remark_forecast_value = that.getView().byId("idinputremarkforcast_value_ReqNewMat").getValue();

		var remark_forecast_req = that.getView().byId("idinputremarkforcast_label_ReqNewMat").getRequired();

		var repair_check = that.getView().byId("idcheckboxrepair_value_ReqNewMat").getSelected();

		var repair_check_req = that.getView().byId("idcheckboxrepair_label_ReqNewMat").getRequired();

		if (repair_check_req == true) {

			if (repair_check == true) {

				that.getView().byId("idcheckboxrepair_value_ReqNewMat").setValueState("Error");

				that.reviewFlag_ReqNewMat = false;

			} else {

				that.getView().byId("idcheckboxrepair_value_ReqNewMat").setValueState("None");

			}

		}

		//pur

		var oem_vendor_value = that.getView().byId("idinputfirstoemvendor_value_ReqNewMat").getValue();

		var oem_vendor_req = that.getView().byId("idinputfirstoemvendor_label_ReqNewMat").getRequired();

		if (oem_vendor_req == true) {

			if (oem_vendor_value == "") {

				that.getView().byId("idinputfirstoemvendor_value_ReqNewMat").setValueState("Error");

				that.reviewFlag_ReqNewMat = false;

			} else {

				that.getView().byId("idinputfirstoemvendor_value_ReqNewMat").setValueState("None");

			}

		}

		var oem_part_value = that.getView().byId("idinputoempartfirst_value_ReqNewMat").getValue();

		var oem_part_req = that.getView().byId("idinputoempartfirst_label_ReqNewMat").getRequired();

		if (oem_part_req == true) {

			if (oem_part_value == "") {

				that.getView().byId("idinputoempartfirst_value_ReqNewMat").setValueState("Error");

				that.reviewFlag_ReqNewMat = false;

			} else {

				that.getView().byId("idinputoempartfirst_value_ReqNewMat").setValueState("None");

			}

		}

		var sec_vendor_value = that.getView().byId("idinputsecondvendor_value_ReqNewMat").getValue();

		var sec_vendor_req = that.getView().byId("idinputsecondvendor_label_ReqNewMat").getRequired();

		if (sec_vendor_req == true) {

			if (sec_vendor_value == "") {

				that.getView().byId("idinputsecondvendor_value_ReqNewMat").setValueState("Error");

				that.reviewFlag_ReqNewMat = false;

			} else {

				that.getView().byId("idinputsecondvendor_value_ReqNewMat").setValueState("None");

			}

		}

		var sec_part_value = that.getView().byId("idinputoempartsecond_value_ReqNewMat").getValue();

		var sec_part_req = that.getView().byId("idinputoempartsecond_label_ReqNewMat").getRequired();

		if (sec_part_req == true) {

			if (sec_part_value == "") {

				that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValueState("Error");

				that.reviewFlag_ReqNewMat = false;

			} else {

				that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValueState("None");

			}

		}
		
			//third and fourth by Udit for new material 
		
		var third_vendor_value = that.getView().byId("idinputthirdoemvendor_value_ReqNewMat").getValue();

		var third_vendor_req = that.getView().byId("idinputthirdoemvendor_label_ReqNewMat").getRequired();

		if (third_vendor_req == true) {

			if (third_vendor_value == "") {

				that.getView().byId("idinputthirdoemvendor_value_ReqNewMat").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputthirdoemvendor_value_ReqNewMat").setValueState("None");

			}

		}

		var third_part_value = that.getView().byId("idinputoempartthird_value_ReqNewMat").getValue();

		var third_part_req = that.getView().byId("idinputoempartthird_label_ReqNewMat").getRequired();

		if (third_part_req == true) {

			if (third_part_value == "") {

				that.getView().byId("idinputoempartthird_value_ReqNewMat").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputoempartthird_value_ReqNewMat").setValueState("None");

			}

		}

		var fourth_vendor_value = that.getView().byId("idinputfourthvendor_value_ReqNewMat").getValue();

		var fourth_vendor_req = that.getView().byId("idinputfourthvendor_label_ReqNewMat").getRequired();

		if (fourth_vendor_req == true) {

			if (fourth_vendor_value == "") {

				that.getView().byId("idinputfourthvendor_value_ReqNewMat").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputfourthvendor_value_ReqNewMat").setValueState("None");

			}

		}

		var fourth_part_value = that.getView().byId("idinputoempartfourth_value_ReqNewMat").getValue();

		var fourth_part_req = that.getView().byId("idinputoempartfourth_label_ReqNewMat").getRequired();

		if (fourth_part_req == true) {

			if (fourth_part_value == "") {

				that.getView().byId("idinputoempartfourth_value_ReqNewMat").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputoempartfourth_value_ReqNewMat").setValueState("None");

			}

		}
		
		
		
		
		
		
		
		

		var critical_value = that.getView().byId("idinputcriticalpart_value_ReqNewMat").getValue();

		var critical_req = that.getView().byId("idinputcriticalpart_label_ReqNewMat").getRequired();

		if (critical_req == true) {

			if (critical_value == "") {

				that.getView().byId("idinputcriticalpart_value_ReqNewMat").setValueState("Error");

				that.reviewFlag_ReqNewMat = false;

			} else {

				that.getView().byId("idinputcriticalpart_value_ReqNewMat").setValueState("None");

			}

		}

		//fin

		var profit_cen_value = that.getView().byId("idinputprofitcentre_value_ReqNewMat").getValue();

		var profit_cen_req = that.getView().byId("idinputprofitcentre_label_ReqNewMat").getRequired();

		if (profit_cen_req == true) {

			if (profit_cen_value == "") {

				that.getView().byId("idinputprofitcentre_value_ReqNewMat").setValueState("Error");

				that.reviewFlag_ReqNewMat = false;

			} else {

				that.getView().byId("idinputprofitcentre_value_ReqNewMat").setValueState("None");

			}

		}

		//wh

		var serialnoproof_value = that.getView().byId("idinputserialnoprof_value_ReqNewMat").getValue();

		var serialnoproof_req = that.getView().byId("idinputserialnoprof_label_ReqNewMat").getRequired();

		var serial_level_hand_value = that.getView().byId("idseriallevelinput_value_ReqNewMat").getValue();

		var serial_level_req = that.getView().byId("idseriallevelinput_label_ReqNewMat").getRequired();

		var aut_serial_num_check = that.getView().byId("idcheckboxautserialno_value_ReqNewMat").getSelected();

		var aut_serial_num_check_req = that.getView().byId("idcheckboxautserialno_label_ReqNewMat").getRequired();

		if (aut_serial_num_check == true) {

			if (serialnoproof_value == "" && serial_level_hand_value == "") {
				that.getView().byId("idinputserialnoprof_value_ReqNewMat").setValueState("Error");
				that.getView().byId("idseriallevelinput_value_ReqNewMat").setValueState("Error");
				that.reviewFlag_ReqNewMat = false;
			} else if (serialnoproof_value == "") {
				that.getView().byId("idinputserialnoprof_value_ReqNewMat").setValueState("Error");
				that.reviewFlag_ReqNewMat = false;
			} else if (serial_level_hand_value == "") {
				that.getView().byId("idseriallevelinput_value_ReqNewMat").setValueState("Error");
				that.reviewFlag_ReqNewMat = false;
			} else {
				that.getView().byId("idinputserialnoprof_value_ReqNewMat").setValueState("None");
				that.getView().byId("idseriallevelinput_value_ReqNewMat").setValueState("None");
			}

		} else {

			that.getView().byId("idinputserialnoprof_value_ReqNewMat").setValueState("None");
			that.getView().byId("idseriallevelinput_value_ReqNewMat").setValueState("None");

		}

		var UOI_value = that.getView().byId("idinputuoi_value_ReqNewMat").getValue();

		var UOI_req = that.getView().byId("idinputuoi_label_ReqNewMat").getRequired();

		if (UOI_req == true) {

			if (UOI_value == "") {

				that.getView().byId("idinputuoi_value_ReqNewMat").setValueState("Error");

				that.reviewFlag_ReqNewMat = false;

			} else {

				that.getView().byId("idinputuoi_value_ReqNewMat").setValueState("None");
			}
		}

		var add_store_typ_value = that.getView().byId("addstoreinputid_value_ReqNewMat").getTokens();

		var add_store_typ_req = that.getView().byId("addstoreinputid_label_ReqNewMat").getRequired();
		// if (oControllerObjReqNewMat.byId("addstoreinputid_value_ReqNewMat").getTokens().length>) {
		if (that.byId("addstoreinputid_value_ReqNewMat").getTokens().length > 10) {
			that.getView().byId("addstoreinputid_value_ReqNewMat").setValueState("Error");
			that.reviewFlag_ReqNewMat = false;
			that.getView().byId("addstoreinputid_value_ReqNewMat").setValueStateText(" Please select only 10 Storage Locations");
		}
		// }

		var serialnoproof_value = that.getView().byId("idinputserialnoprof_value_ReqNewMat").getValue();

		var serialnoproof_req = that.getView().byId("idinputserialnoprof_label_ReqNewMat").getRequired();

		var conversion_value = that.getView().byId("idinputconversion_value_ReqNewMat").getValue();

		var conversion_req = that.getView().byId("idinputconversion_label_ReqNewMat").getRequired();

		var conversion_value_1 = that.getView().byId("idinputconversion_value1_ReqNewMat").getValue();

		if (conversion_req == true) {

			if (conversion_value == "" && conversion_value_1 == "") {

				that.getView().byId("idinputconversion_value_ReqNewMat").setValueState("Error");
				that.getView().byId("idinputconversion_value1_ReqNewMat").setValueState("Error");
				that.reviewFlag_ReqNewMat = false;

			} else if (conversion_value == "") {

				that.getView().byId("idinputconversion_value_ReqNewMat").setValueState("Error");
				that.reviewFlag_ReqNewMat = false;

			} else if (conversion_value_1 == "") {

				that.getView().byId("idinputconversion_value1_ReqNewMat").setValueState("Error");
				that.reviewFlag_ReqNewMat = false;

			} else {

				that.getView().byId("idinputconversion_value_ReqNewMat").setValueState("None");
				that.getView().byId("idinputconversion_value1_ReqNewMat").setValueState("None");

			}

		}

		var remarks_spec_hand_value = that.getView().byId("idinputremarks_value_ReqNewMat").getValue();

		var remarks_spec_hand_req = that.getView().byId("idinputremarks_label_ReqNewMat").getRequired();

		var serial_level_hand_value = that.getView().byId("idseriallevelinput_value_ReqNewMat").getValue();

		var serial_level_req = that.getView().byId("idseriallevelinput_label_ReqNewMat").getRequired();

		//qm

		var qua_insp_check = that.getView().byId("idcheckboxqualityinspect_value_ReqNewMat").getSelected();

		var qua_insp_req = that.getView().byId("idcheckboxqualityinspect_label_ReqNewMat").getRequired();

		var batch_manag_check = that.getView().byId("idcheckboxbatchmanag_value_ReqNewMat").getSelected();

		var batch_manag_req = that.getView().byId("idcheckboxbatchmanag_label_ReqNewMat").getRequired();

		var shel_life_check = that.getView().byId("idcheckboxshelfile_value_ReqNewMat").getSelected();

		var shel_life_check_req = that.getView().byId("idcheckboxshelfile_label_ReqNewMat").getRequired();

	},

	z_app_spare_parts.z_spare_parts1.util.InputMatInformation.clearInputMatInformationReqNewMat = function (that) {

		debugger;

		that.getView().byId("idinputusername_value_ReqNewMat").setValue(""); //get value for input
		that.getView().byId("idinputusername_value_ReqNewMat").setDescription("");

		that.getView().byId("idinputusername_label_ReqNewMat").getRequired(); //label required

		that.getView().byId("idinputcontact_value_ReqNewMat").setValue("");
		that.getView().byId("idinputcontact_value_ReqNewMat").setDescription("");

		var contact_req = that.getView().byId("idinputcontact_label_ReqNewMat").getRequired();

		var eol_flag_check = that.getView().byId("idEOLFLAG_value_ReqNewMat").setSelected(false);

		var eol_flag_check_req = that.getView().byId("idEOLFLAG_label_ReqNewMat").getRequired();

		that.getView().byId("idplantinput_value_ReqNewMat").setValue("");
		that.getView().byId("idplantinput_value_ReqNewMat").setDescription("");

		var plant_req = that.getView().byId("idplantinput_label_ReqNewMat").getRequired();

		that.getView().byId("idplantinput_value_ReqNewMat").setValueState("None");

		that.getView().byId("idinputpcn_value_ReqNewMat").setValue("");
		that.getView().byId("idinputpcn_value_ReqNewMat").setDescription("");

		var purchase_code_num__req = that.getView().byId("idinputpcn_label_ReqNewMat").getRequired();

		that.getView().byId("idinputpcn_value_ReqNewMat").setValueState("None");

		that.getView().byId("idBaseUOMinput_value_ReqNewMat").setValue("");
		that.getView().byId("idBaseUOMinput_value_ReqNewMat").setDescription("");

		var buom__req = that.getView().byId("idBaseUOMinput_label_ReqNewMat").getRequired();

		that.getView().byId("idBaseUOMinput_value_ReqNewMat").setValueState("None");

		that.getView().byId("idcomboboxconsumable_value_ReqNewMat").setValue("");
		that.getView().byId("idcomboboxconsumable_value_ReqNewMat").setDescription("");
		// that.getView().byId("idcomboboxconsumable_value_ReqNewMat").setDescription("");

		var consumable__req = that.getView().byId("idcomboboxconsumable_label_ReqNewMat").getRequired();

		that.getView().byId("idcomboboxconsumable_value_ReqNewMat").setValueState("None");

		//mrp

		that.getView().byId("idinputforecaseperiod_value_ReqNewMat").setValue("");
		that.getView().byId("idinputforecaseperiod_value_ReqNewMat").setDescription("");

		var forcast_per_period__req = that.getView().byId("idinputforecaseperiod_label_ReqNewMat").getRequired();

		that.getView().byId("idinputquantityperbatch_value_ReqNewMat").setValue("1");
		that.getView().byId("idinputquantityperbatch_value_ReqNewMat").setDescription("");

		var quality_batch__req = that.getView().byId("idinputquantityperbatch_label_ReqNewMat").getRequired();

		that.getView().byId("idinputcostcenter_value_ReqNewMat").setValue("");
		that.getView().byId("idinputcostcenter_value_ReqNewMat").setDescription("");

		var cost_centre__req = that.getView().byId("idinputcostcenter_label_ReqNewMat").getRequired();

		that.getView().byId("idinputperiod_value_ReqNewMat").setValue("");
		that.getView().byId("idinputperiod_value_ReqNewMat").setDescription("");

		var period__req = that.getView().byId("idinputperiod_label_ReqNewMat").getRequired();

		that.getView().byId("idcheckboxstoragronly_value_ReqNewMat").setSelected(false);

		var storage_check_req = that.getView().byId("idcheckboxstoragronly_label_ReqNewMat").getRequired();

		that.getView().byId("idinputforecaseperiod_value_ReqNewMat").setValueState("None");

		that.getView().byId("idinputperiod_value_ReqNewMat").setValueState("None");

		var remark_forecast_value = that.getView().byId("idinputremarkforcast_value_ReqNewMat").setValue("");

		var remark_forecast_req = that.getView().byId("idinputremarkforcast_label_ReqNewMat").getRequired();

		that.getView().byId("idcheckboxrepair_value_ReqNewMat").setSelected(false);

		var repair_check_req = that.getView().byId("idcheckboxrepair_label_ReqNewMat").getRequired();

		that.getView().byId("idcheckboxrepair_value_ReqNewMat").setValueState("None");

		//pur
		// changed by Udit - code to have star mark in OEM 1 and 2
		that.getView().byId("idinputfirstoemvendor_label_ReqNewMat").setRequired(true);
		that.getView().byId("idinputoempartfirst_label_ReqNewMat").setRequired(true);
		that.getView().byId("idinputsecondvendor_label_ReqNewMat").setRequired(true);
		that.getView().byId("idinputoempartsecond_label_ReqNewMat").setRequired(true);
		
		that.getView().byId("idinputfirstoemvendor_value_ReqNewMat").setValue("");
		that.getView().byId("idinputfirstoemvendor_value_ReqNewMat").setDescription("");
		
		var oem_vendor_req = that.getView().byId("idinputfirstoemvendor_label_ReqNewMat").getRequired();

		that.getView().byId("idinputfirstoemvendor_value_ReqNewMat").setValueState("None");

		var oem_part_value = that.getView().byId("idinputoempartfirst_value_ReqNewMat").setValue("");

		var oem_part_req = that.getView().byId("idinputoempartfirst_label_ReqNewMat").getRequired();

		that.getView().byId("idinputoempartfirst_value_ReqNewMat").setValueState("None");

		that.getView().byId("idinputsecondvendor_value_ReqNewMat").setValue("");
		that.getView().byId("idinputsecondvendor_value_ReqNewMat").setDescription("");

		var sec_vendor_req = that.getView().byId("idinputsecondvendor_label_ReqNewMat").getRequired();

		that.getView().byId("idinputsecondvendor_value_ReqNewMat").setValueState("None");

		that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue("");
		that.getView().byId("idinputoempartsecond_value_ReqNewMat").setDescription("");

		var sec_part_req = that.getView().byId("idinputoempartsecond_label_ReqNewMat").getRequired();

		that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValueState("None");

		that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValue("");
		that.getView().byId("idinputoempartsecond_value_ReqNewMat").setDescription("");

		var sec_part_req = that.getView().byId("idinputoempartsecond_label_ReqNewMat").getRequired();

		that.getView().byId("idinputoempartsecond_value_ReqNewMat").setValueState("None");

		//new req for adding third and fourth vendor and part number TB 28-1-19
		that.getView().byId("idinputthirdoemvendor_value_ReqNewMat").setValue("");
		that.getView().byId("idinputthirdoemvendor_value_ReqNewMat").setDescription("");
		that.getView().byId("idinputthirdoemvendor_value_ReqNewMat").setValueState("None");

		that.getView().byId("idinputfourthvendor_value_ReqNewMat").setValue("");
		that.getView().byId("idinputfourthvendor_value_ReqNewMat").setDescription("");
		that.getView().byId("idinputfourthvendor_value_ReqNewMat").setValueState("None");

		that.getView().byId("idinputoempartthird_value_ReqNewMat").setValue("");
		that.getView().byId("idinputoempartthird_value_ReqNewMat").setDescription("");
		that.getView().byId("idinputoempartthird_value_ReqNewMat").setValueState("None");

		that.getView().byId("idinputoempartfourth_value_ReqNewMat").setValue("");
		that.getView().byId("idinputoempartfourth_value_ReqNewMat").setDescription("");
		that.getView().byId("idinputoempartfourth_value_ReqNewMat").setValueState("None");

		//new req for adding third and fourth vendor and part number TB 28-1-19

		that.getView().byId("idinputcriticalpart_value_ReqNewMat").setValue("");
		that.getView().byId("idinputcriticalpart_value_ReqNewMat").setDescription("");

		var critical_req = that.getView().byId("idinputcriticalpart_label_ReqNewMat").getRequired();

		that.getView().byId("idinputcriticalpart_value_ReqNewMat").setValueState("None");

		//fin

		that.getView().byId("idinputprofitcentre_value_ReqNewMat").setValue("");
		that.getView().byId("idinputprofitcentre_value_ReqNewMat").setDescription("");

		var profit_cen_req = that.getView().byId("idinputprofitcentre_label_ReqNewMat").getRequired();

		that.getView().byId("idinputprofitcentre_value_ReqNewMat").setValueState("None");

		//wh

		that.getView().byId("idcheckboxautserialno_value_ReqNewMat").setSelected(false);

		var aut_serial_num_check_req = that.getView().byId("idcheckboxautserialno_label_ReqNewMat").getRequired();

		that.getView().byId("idseriallevelinput_value_ReqNewMat").setValueState("None");

		that.getView().byId("idinputuoi_value_ReqNewMat").setValue("");
		that.getView().byId("idinputuoi_value_ReqNewMat").setDescription("");

		var UOI_req = that.getView().byId("idinputuoi_label_ReqNewMat").getRequired();

		that.getView().byId("addstoreinputid_value_ReqNewMat").setTokens([]);
		// that.getView().byId("addstoreinputid_value_ReqNewMat").setDescription("");

		var add_store_typ_req = that.getView().byId("addstoreinputid_label_ReqNewMat").getRequired();

		that.getView().byId("idinputserialnoprof_value_ReqNewMat").setValue("");
		that.getView().byId("idinputserialnoprof_value_ReqNewMat").setDescription("");

		var serialnoproof_req = that.getView().byId("idinputserialnoprof_label_ReqNewMat").getRequired();

		that.getView().byId("idinputconversion_value_ReqNewMat").setValue("");
		that.getView().byId("idinputconversion_value_ReqNewMat").setDescription("");
		that.getView().byId("idinputconversion_value1_ReqNewMat").setValue("");
		that.getView().byId("idinputconversion_value1_ReqNewMat").setDescription("");

		var conversion_req = that.getView().byId("idinputconversion_label_ReqNewMat").getRequired();

		that.getView().byId("idinputremarks_value_ReqNewMat").setValue("");
		// that.getView().byId("idinputremarks_value_ReqNewMat").setDescription("");

		var remarks_spec_hand_req = that.getView().byId("idinputremarks_label_ReqNewMat").getRequired();

		that.getView().byId("idseriallevelinput_value_ReqNewMat").setValue("");
		that.getView().byId("idseriallevelinput_value_ReqNewMat").setDescription("");

		var serial_level_req = that.getView().byId("idseriallevelinput_label_ReqNewMat").getRequired();

		//qm

		that.getView().byId("idcheckboxqualityinspect_value_ReqNewMat").setSelected(false);

		var qua_insp_req = that.getView().byId("idcheckboxqualityinspect_label_ReqNewMat").getRequired();

		that.getView().byId("idcheckboxbatchmanag_value_ReqNewMat").setSelected(false);

		// that.getView().byId("idcheckboxbatchmanag_label_ReqNewMat").getRequired();

		that.getView().byId("idcheckboxshelfile_value_ReqNewMat").setSelected(false);

		// that.getView().byId("idcheckboxshelfile_label_ReqNewMat").getRequired();
		//added by Udit Kandh to clear attachment list
		that.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_NEW_MAT").setData("");
	//	that.getView().byId("idAttachment_value_ReqNewMat").destroyItems();
	//	that.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_NEW_MAT").getData().results = [];
		/*var oModelAttach = that.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_NEW_MAT");
		oModelAttach.updateBindings(true);
		oModelAttach.refresh();*/
		//Remarks added by Udit as values are not getting clear in case of Request New Material
		that.getView().byId("idReqComment_value_ReqNewMat").setValue("");
	},

	z_app_spare_parts.z_spare_parts1.util.InputMatInformation.loadInputMatInformationCopyMaterial = function (that) {

		debugger;
		var oRequestCopyMaterialModelData = that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0]; //complete json

		// that.getView().byId("idinputusername_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.); //get value for input
		// that.getView().byId("idinputcontact_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.Contact);
		that.getView().byId("idplantinput_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.Werks);
		that.selectedPlant = oRequestCopyMaterialModelData.Werks;
		that.getView().byId("idinputpcn_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.Matkl);
		that.getView().byId("idBaseUOMinput_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.Meins);
		that.getView().byId("idcomboboxconsumable_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.ValClass);
		//mrp commented by Udit
	//	that.getView().byId("idinputforecaseperiod_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.ForcstPer);
		// that.getView().byId("idinputquantityperbatch_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.);
		that.getView().byId("idinputcostcenter_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.Kostl);
		that.getView().byId("idinputperiod_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.Period);
		that.getView().byId("idinputremarkforcast_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.ForRemrk);
		//pur
		that.getView().byId("idinputfirstoemvendor_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.OemVend);
		that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.OemPart);
		that.getView().byId("idinputsecondvendor_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.OemVend2);
		that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.OemPart2);
		that.getView().byId("idinputcriticalpart_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.CritPart);
		
		// Udit******************************************
		that.getView().byId("idinputthirdoemvendor_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.OemVend3);
		that.getView().byId("idinputoempartthird_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.OemPart3);
		that.getView().byId("idinputfourthvendor_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.OemVend4);
		that.getView().byId("idinputoempartfourth_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.OemPart4);

		//fin
		that.getView().byId("idinputprofitcentre_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.Prctr);
		//wh
		that.getView().byId("idinputuoi_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.Msehi);
		// that.getView().byId("addstoreinputid_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.);
		that.getView().byId("idinputserialnoprof_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.Serail);

		that.getView().byId("idinputconversion_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.Conv);
		that.getView().byId("idinputconversion_value_ReqCopyMat").setDescription(oRequestCopyMaterialModelData.Meins);
		that.getView().byId("idinputconversion_value1_ReqCopyMat").setValue(oRequestCopyMaterialModelData.Conv);
		that.getView().byId("idinputconversion_value1_ReqCopyMat").setDescription(oRequestCopyMaterialModelData.Msehi);

		that.getView().byId("idinputremarks_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.WhRemrk);
		that.getView().byId("idseriallevelinput_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.Serlv);
		that.getView().byId("idReqComment_value_ReqCopyMat").setValue(oRequestCopyMaterialModelData.ReqComment);

	},

	z_app_spare_parts.z_spare_parts1.util.InputMatInformation.clearInputMatInformationReqCopyMat = function (that) {

		debugger;

		that.getView().byId("idinputusername_value_ReqCopyMat").setValue(""); //get value for input
		that.getView().byId("idinputusername_value_ReqCopyMat").setDescription("");

		that.getView().byId("idinputusername_label_ReqCopyMat").getRequired(); //label required

		that.getView().byId("idinputcontact_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputcontact_value_ReqCopyMat").setDescription("");

		var contact_req = that.getView().byId("idinputcontact_label_ReqCopyMat").getRequired();

		var eol_flag_check = that.getView().byId("idEOLFLAG_value_ReqCopyMat").setSelected(false);

		var eol_flag_check_req = that.getView().byId("idEOLFLAG_label_ReqCopyMat").getRequired();

		that.getView().byId("idplantinput_value_ReqCopyMat").setValue("");
		that.getView().byId("idplantinput_value_ReqCopyMat").setDescription("");

		var plant_req = that.getView().byId("idplantinput_label_ReqCopyMat").getRequired();

		that.getView().byId("idplantinput_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idinputpcn_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputpcn_value_ReqCopyMat").setDescription("");

		var purchase_code_num__req = that.getView().byId("idinputpcn_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputpcn_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idBaseUOMinput_value_ReqCopyMat").setValue("");
		that.getView().byId("idBaseUOMinput_value_ReqCopyMat").setDescription("");

		var buom__req = that.getView().byId("idBaseUOMinput_label_ReqCopyMat").getRequired();

		that.getView().byId("idBaseUOMinput_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idcomboboxconsumable_value_ReqCopyMat").setValue("");
		that.getView().byId("idcomboboxconsumable_value_ReqCopyMat").setDescription("");

		var consumable__req = that.getView().byId("idcomboboxconsumable_label_ReqCopyMat").getRequired();

		that.getView().byId("idcomboboxconsumable_value_ReqCopyMat").setValueState("None");

		//mrp

		that.getView().byId("idinputforecaseperiod_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputforecaseperiod_value_ReqCopyMat").setDescription("");

		var forcast_per_period__req = that.getView().byId("idinputforecaseperiod_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputquantityperbatch_value_ReqCopyMat").setValue("1");
		that.getView().byId("idinputquantityperbatch_value_ReqCopyMat").setDescription("");

		var quality_batch__req = that.getView().byId("idinputquantityperbatch_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputcostcenter_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputcostcenter_value_ReqCopyMat").setDescription("");

		var cost_centre__req = that.getView().byId("idinputcostcenter_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputperiod_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputperiod_value_ReqCopyMat").setDescription("");

		var period__req = that.getView().byId("idinputperiod_label_ReqCopyMat").getRequired();

		that.getView().byId("idcheckboxstoragronly_value_ReqCopyMat").setSelected(false);

		var storage_check_req = that.getView().byId("idcheckboxstoragronly_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputforecaseperiod_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idinputperiod_value_ReqCopyMat").setValueState("None");

		var remark_forecast_value = that.getView().byId("idinputremarkforcast_value_ReqCopyMat").setValue("");

		var remark_forecast_req = that.getView().byId("idinputremarkforcast_label_ReqCopyMat").getRequired();

		that.getView().byId("idcheckboxrepair_value_ReqCopyMat").setSelected(false);

		var repair_check_req = that.getView().byId("idcheckboxrepair_label_ReqCopyMat").getRequired();

		that.getView().byId("idcheckboxrepair_value_ReqCopyMat").setValueState("None");

		//pur

		that.getView().byId("idinputfirstoemvendor_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputfirstoemvendor_value_ReqCopyMat").setDescription("");

		var oem_vendor_req = that.getView().byId("idinputfirstoemvendor_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputfirstoemvendor_value_ReqCopyMat").setValueState("None");

		var oem_part_value = that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValue("");

		var oem_part_req = that.getView().byId("idinputoempartfirst_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idinputsecondvendor_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputsecondvendor_value_ReqCopyMat").setDescription("");

		var sec_vendor_req = that.getView().byId("idinputsecondvendor_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputsecondvendor_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setDescription("");

		var sec_part_req = that.getView().byId("idinputoempartsecond_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValueState("None");
		
		
		that.getView().byId("idinputcriticalpart_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputcriticalpart_value_ReqCopyMat").setDescription("");

		//new req for adding third and fourth vendor and part number TB 28-1-19
		that.getView().byId("idinputthirdoemvendor_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputthirdoemvendor_value_ReqCopyMat").setDescription("");
		that.getView().byId("idinputthirdoemvendor_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idinputfourthvendor_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputfourthvendor_value_ReqCopyMat").setDescription("");
		that.getView().byId("idinputfourthvendor_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idinputoempartthird_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputoempartthird_value_ReqCopyMat").setDescription("");
		that.getView().byId("idinputoempartthird_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idinputoempartfourth_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputoempartfourth_value_ReqCopyMat").setDescription("");
		that.getView().byId("idinputoempartfourth_value_ReqCopyMat").setValueState("None");

		//new req for adding third and fourth vendor and part number TB 28-1-19

		var critical_req = that.getView().byId("idinputcriticalpart_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputcriticalpart_value_ReqCopyMat").setValueState("None");

		//fin

		that.getView().byId("idinputprofitcentre_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputprofitcentre_value_ReqCopyMat").setDescription("");

		var profit_cen_req = that.getView().byId("idinputprofitcentre_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputprofitcentre_value_ReqCopyMat").setValueState("None");

		//wh

		that.getView().byId("idcheckboxautserialno_value_ReqCopyMat").setSelected(false);

		var aut_serial_num_check_req = that.getView().byId("idcheckboxautserialno_label_ReqCopyMat").getRequired();

		that.getView().byId("idseriallevelinput_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idinputuoi_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputuoi_value_ReqCopyMat").setDescription("");

		var UOI_req = that.getView().byId("idinputuoi_label_ReqCopyMat").getRequired();

		that.getView().byId("addstoreinputid_value_ReqCopyMat").setTokens([]);
		// that.getView().byId("addstoreinputid_value_ReqCopyMat").setDescription("");

		var add_store_typ_req = that.getView().byId("addstoreinputid_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputserialnoprof_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputserialnoprof_value_ReqCopyMat").setDescription("");

		var serialnoproof_req = that.getView().byId("idinputserialnoprof_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputconversion_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputconversion_value_ReqCopyMat").setDescription("");

		var conversion_req = that.getView().byId("idinputconversion_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputremarks_value_ReqCopyMat").setValue("");
		// that.getView().byId("idinputremarks_value_ReqCopyMat").setDescription("");

		var remarks_spec_hand_req = that.getView().byId("idinputremarks_label_ReqCopyMat").getRequired();

		that.getView().byId("idseriallevelinput_value_ReqCopyMat").setValue("");
		that.getView().byId("idseriallevelinput_value_ReqCopyMat").setDescription("");

		var serial_level_req = that.getView().byId("idseriallevelinput_label_ReqCopyMat").getRequired();

		//qm

		that.getView().byId("idcheckboxqualityinspect_value_ReqCopyMat").setSelected(false);

		var qua_insp_req = that.getView().byId("idcheckboxqualityinspect_label_ReqCopyMat").getRequired();

		that.getView().byId("idcheckboxbatchmanag_value_ReqCopyMat").setSelected(false);

		// that.getView().byId("idcheckboxbatchmanag_label_ReqCopyMat").getRequired();

		that.getView().byId("idcheckboxshelfile_value_ReqCopyMat").setSelected(false);

		// that.getView().byId("idcheckboxshelfile_label_ReqCopyMat").getRequired();
		that.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_COPY_MAT").setData("");

	},

	z_app_spare_parts.z_spare_parts1.util.InputMatInformation.reviewInputMatInformationReqCopyMat = function (that) {

		debugger;

		var user_name_value = that.getView().byId("idinputusername_value_ReqCopyMat").getValue(); //get value for input

		var user_name_req = that.getView().byId("idinputusername_label_ReqCopyMat").getRequired(); //label required

		var contact_value = that.getView().byId("idinputcontact_value_ReqCopyMat").getValue();

		var contact_req = that.getView().byId("idinputcontact_label_ReqCopyMat").getRequired();

		var eol_flag_check = that.getView().byId("idEOLFLAG_value_ReqCopyMat").getSelected();

		var eol_flag_check_req = that.getView().byId("idEOLFLAG_label_ReqCopyMat").getRequired();

		var plant_value = that.getView().byId("idplantinput_value_ReqCopyMat").getValue();

		var plant_req = that.getView().byId("idplantinput_label_ReqCopyMat").getRequired();

		if (plant_req == true) {

			if (plant_value == "") {

				that.getView().byId("idplantinput_value_ReqCopyMat").setValueState("Error");

				that.reviewFlag_ReqCopyMat = false;

			} else {

				that.getView().byId("idplantinput_value_ReqCopyMat").setValueState("None");

			}

		}

		var purchase_code_num_value = that.getView().byId("idinputpcn_value_ReqCopyMat").getValue();

		var purchase_code_num__req = that.getView().byId("idinputpcn_label_ReqCopyMat").getRequired();

		if (purchase_code_num__req == true) {

			if (purchase_code_num_value == "") {

				that.getView().byId("idinputpcn_value_ReqCopyMat").setValueState("Error");

				that.reviewFlag_ReqCopyMat = false;

			} else {

				that.getView().byId("idinputpcn_value_ReqCopyMat").setValueState("None");

			}

		}

		var buom_value = that.getView().byId("idBaseUOMinput_value_ReqCopyMat").getValue();

		var buom__req = that.getView().byId("idBaseUOMinput_label_ReqCopyMat").getRequired();

		if (buom__req == true) {

			if (buom_value == "") {

				that.getView().byId("idBaseUOMinput_value_ReqCopyMat").setValueState("Error");

				that.reviewFlag_ReqCopyMat = false;

			} else {

				that.getView().byId("idBaseUOMinput_value_ReqCopyMat").setValueState("None");

			}

		}

		var consumable_value = that.getView().byId("idcomboboxconsumable_value_ReqCopyMat").getValue();

		var consumable__req = that.getView().byId("idcomboboxconsumable_label_ReqCopyMat").getRequired();

		if (consumable__req == true) {

			if (consumable_value == "") {

				that.getView().byId("idcomboboxconsumable_value_ReqCopyMat").setValueState("Error");

				that.reviewFlag_ReqCopyMat = false;

			} else {

				that.getView().byId("idcomboboxconsumable_value_ReqCopyMat").setValueState("None");

			}

		}

		//mrp

		var forcast_per_period_value = that.getView().byId("idinputforecaseperiod_value_ReqCopyMat").getValue();
		
		if (forcast_per_period_value == 0 && storage_check == false) {

			that.getView().byId("idinputforecaseperiod_value_ReqCopyMat").setValueState("Error");
			that.getView().byId("idinputforecaseperiod_value_ReqCopyMat").setValueStateText("Value Cannot be Zero");
			sap.m.MessageBox.error(" Value Cannot be Zero for Forecast period");
			that.reviewFlag_ReqCopyMat = false;

		} else {

			that.getView().byId("idinputforecaseperiod_value_ReqCopyMat").setValueState("None");
			that.getView().byId("idinputforecaseperiod_value_ReqCopyMat").setValueStateText("");

		}

		var forcast_per_period__req = that.getView().byId("idinputforecaseperiod_label_ReqCopyMat").getRequired();

		var quality_batch_value = that.getView().byId("idinputquantityperbatch_value_ReqCopyMat").getValue();

		var quality_batch__req = that.getView().byId("idinputquantityperbatch_label_ReqCopyMat").getRequired();

		var cost_centre_value = that.getView().byId("idinputcostcenter_value_ReqCopyMat").getValue();

		var cost_centre__req = that.getView().byId("idinputcostcenter_label_ReqCopyMat").getRequired();

		var period_value = that.getView().byId("idinputperiod_value_ReqCopyMat").getValue();

		var period__req = that.getView().byId("idinputperiod_label_ReqCopyMat").getRequired();

		var storage_check = that.getView().byId("idcheckboxstoragronly_value_ReqCopyMat").getSelected();

		var storage_check_req = that.getView().byId("idcheckboxstoragronly_label_ReqCopyMat").getRequired();

		// if (storage_check_req == true) {

		if (storage_check == false) {

			if (forcast_per_period_value == "" && period_value == "") {
				that.getView().byId("idinputforecaseperiod_value_ReqCopyMat").setValueState("Error");
				that.getView().byId("idinputperiod_value_ReqCopyMat").setValueState("Error");
				that.reviewFlag_ReqCopyMat = false;
			} else if (forcast_per_period_value == "") {
				that.getView().byId("idinputforecaseperiod_value_ReqCopyMat").setValueState("Error");
				that.reviewFlag_ReqCopyMat = false;
			} else if (period_value == "") {
				that.getView().byId("idinputperiod_value_ReqCopyMat").setValueState("Error");
				that.reviewFlag_ReqCopyMat = false;
			}

		} else {

			that.getView().byId("idinputforecaseperiod_value_ReqCopyMat").setValueState("None");

			that.getView().byId("idinputperiod_value_ReqCopyMat").setValueState("None");

		}

		// }

		var remark_forecast_value = that.getView().byId("idinputremarkforcast_value_ReqCopyMat").getValue();

		var remark_forecast_req = that.getView().byId("idinputremarkforcast_label_ReqCopyMat").getRequired();

		var repair_check = that.getView().byId("idcheckboxrepair_value_ReqCopyMat").getSelected();

		var repair_check_req = that.getView().byId("idcheckboxrepair_label_ReqCopyMat").getRequired();

		if (repair_check_req == true) {

			if (repair_check == true) {

				that.getView().byId("idcheckboxrepair_value_ReqCopyMat").setValueState("Error");

				that.reviewFlag_ReqCopyMat = false;

			} else {

				that.getView().byId("idcheckboxrepair_value_ReqCopyMat").setValueState("None");

			}

		}

		//pur

		var oem_vendor_value = that.getView().byId("idinputfirstoemvendor_value_ReqCopyMat").getValue();

		var oem_vendor_req = that.getView().byId("idinputfirstoemvendor_label_ReqCopyMat").getRequired();

		if (oem_vendor_req == true) {

			if (oem_vendor_value == "") {

				that.getView().byId("idinputfirstoemvendor_value_ReqCopyMat").setValueState("Error");

				that.reviewFlag_ReqCopyMat = false;

			} else {

				that.getView().byId("idinputfirstoemvendor_value_ReqCopyMat").setValueState("None");

			}

		}

		var oem_part_value = that.getView().byId("idinputoempartfirst_value_ReqCopyMat").getValue();

		var oem_part_req = that.getView().byId("idinputoempartfirst_label_ReqCopyMat").getRequired();

		if (oem_part_req == true) {

			if (oem_part_value == "") {

				that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValueState("Error");

				that.reviewFlag_ReqCopyMat = false;

			} else {

				that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValueState("None");

			}

		}

		var sec_vendor_value = that.getView().byId("idinputsecondvendor_value_ReqCopyMat").getValue();

		var sec_vendor_req = that.getView().byId("idinputsecondvendor_label_ReqCopyMat").getRequired();

		if (sec_vendor_req == true) {

			if (sec_vendor_value == "") {

				that.getView().byId("idinputsecondvendor_value_ReqCopyMat").setValueState("Error");

				that.reviewFlag_ReqCopyMat = false;

			} else {

				that.getView().byId("idinputsecondvendor_value_ReqCopyMat").setValueState("None");

			}

		}

		var sec_part_value = that.getView().byId("idinputoempartsecond_value_ReqCopyMat").getValue();

		var sec_part_req = that.getView().byId("idinputoempartsecond_label_ReqCopyMat").getRequired();

		if (sec_part_req == true) {

			if (sec_part_value == "") {

				that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValueState("Error");

				that.reviewFlag_ReqCopyMat = false;

			} else {

				that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValueState("None");

			}

		}
		
		//udit start----------------------------------------------------
			var third_vendor_value = that.getView().byId("idinputthirdoemvendor_value_ReqCopyMat").getValue();

		var third_vendor_req = that.getView().byId("idinputthirdoemvendor_label_ReqCopyMat").getRequired();

		if (third_vendor_req == true) {

			if (third_vendor_value == "") {

				that.getView().byId("idinputthirdoemvendor_value_ReqCopyMat").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputthirdoemvendor_value_ReqCopyMat").setValueState("None");

			}

		}

		var third_part_value = that.getView().byId("idinputoempartthird_value_ReqCopyMat").getValue();

		var third_part_req = that.getView().byId("idinputoempartthird_label_ReqCopyMat").getRequired();

		if (third_part_req == true) {

			if (third_part_value == "") {

				that.getView().byId("idinputoempartthird_value_ReqCopyMat").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputoempartthird_value_ReqCopyMat").setValueState("None");

			}

		}

		var fourth_vendor_value = that.getView().byId("idinputfourthvendor_value_ReqCopyMat").getValue();

		var fourth_vendor_req = that.getView().byId("idinputfourthvendor_label_ReqCopyMat").getRequired();

		if (fourth_vendor_req == true) {

			if (fourth_vendor_value == "") {

				that.getView().byId("idinputfourthvendor_value_ReqCopyMat").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputfourthvendor_value_ReqCopyMat").setValueState("None");

			}

		}

		var fourth_part_value = that.getView().byId("idinputoempartfourth_value_ReqCopyMat").getValue();

		var fourth_part_req = that.getView().byId("idinputoempartfourth_label_ReqCopyMat").getRequired();

		if (fourth_part_req == true) {

			if (fourth_part_value == "") {

				that.getView().byId("idinputoempartfourth_value_ReqCopyMat").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputoempartfourth_value_ReqCopyMat").setValueState("None");

			}

		}
		
		
		//udit end--------------------------------------------------

		var critical_value = that.getView().byId("idinputcriticalpart_value_ReqCopyMat").getValue();

		var critical_req = that.getView().byId("idinputcriticalpart_label_ReqCopyMat").getRequired();

		if (critical_req == true) {

			if (critical_value == "") {

				that.getView().byId("idinputcriticalpart_value_ReqCopyMat").setValueState("Error");

				that.reviewFlag_ReqCopyMat = false;

			} else {

				that.getView().byId("idinputcriticalpart_value_ReqCopyMat").setValueState("None");

			}

		}

		//fin

		var profit_cen_value = that.getView().byId("idinputprofitcentre_value_ReqCopyMat").getValue();

		var profit_cen_req = that.getView().byId("idinputprofitcentre_label_ReqCopyMat").getRequired();

		if (profit_cen_req == true) {

			if (profit_cen_value == "") {

				that.getView().byId("idinputprofitcentre_value_ReqCopyMat").setValueState("Error");

				that.reviewFlag_ReqCopyMat = false;

			} else {

				that.getView().byId("idinputprofitcentre_value_ReqCopyMat").setValueState("None");

			}

		}

		//wh
		var serialnoproof_value = that.getView().byId("idinputserialnoprof_value_ReqCopyMat").getValue();

		var serialnoproof_req = that.getView().byId("idinputserialnoprof_label_ReqCopyMat").getRequired();

		var serial_level_hand_value = that.getView().byId("idseriallevelinput_value_ReqCopyMat").getValue();

		var serial_level_req = that.getView().byId("idseriallevelinput_label_ReqCopyMat").getRequired();

		var aut_serial_num_check = that.getView().byId("idcheckboxautserialno_value_ReqCopyMat").getSelected();

		var aut_serial_num_check_req = that.getView().byId("idcheckboxautserialno_label_ReqCopyMat").getRequired();

		if (aut_serial_num_check == true) {

			if (serialnoproof_value == "" && serial_level_hand_value == "") {
				that.getView().byId("idinputserialnoprof_value_ReqCopyMat").setValueState("Error");
				that.getView().byId("idseriallevelinput_value_ReqCopyMat").setValueState("Error");
				that.reviewFlag_ReqCopyMat = false;
			} else if (serialnoproof_value == "") {
				that.getView().byId("idinputserialnoprof_value_ReqCopyMat").setValueState("Error");
				that.reviewFlag_ReqCopyMat = false;
			} else if (serial_level_hand_value == "") {
				that.getView().byId("idseriallevelinput_value_ReqCopyMat").setValueState("Error");
				that.reviewFlag_ReqCopyMat = false;
			}

		} else {

			that.getView().byId("idinputserialnoprof_value_ReqCopyMat").setValueState("None");
			that.getView().byId("idseriallevelinput_value_ReqCopyMat").setValueState("None");

		}

		var UOI_value = that.getView().byId("idinputuoi_value_ReqCopyMat").getValue();

		var UOI_req = that.getView().byId("idinputuoi_label_ReqCopyMat").getRequired();

		if (UOI_req == true) {

			if (UOI_value == "") {

				that.getView().byId("idinputuoi_value_ReqCopyMat").setValueState("Error");

				that.reviewFlag_ReqCopyMat = false;

			} else {

				that.getView().byId("idinputuoi_value_ReqCopyMat").setValueState("None");

			}

		}

		var add_store_typ_value = that.getView().byId("addstoreinputid_value_ReqCopyMat").getTokens();
		if (that.byId("addstoreinputid_value_ReqCopyMat").getTokens().length > 10) {
			that.getView().byId("addstoreinputid_value_ReqCopyMat").setValueState("Error");
			that.reviewFlag_ReqNewMat = false;
			that.getView().byId("addstoreinputid_value_ReqCopyMat").setValueStateText(" Please select only 10 Storage Locations");
		}

		// var add_store_typ_req = that.getView().byId("addstoreinputid_label_ReqCopyMat").getRequired();

		var conversion_value = that.getView().byId("idinputconversion_value_ReqCopyMat").getValue();

		var conversion_req = that.getView().byId("idinputconversion_label_ReqCopyMat").getRequired();

		var conversion_value_1 = that.getView().byId("idinputconversion_value1_ReqCopyMat").getValue();

		if (conversion_req == true) {

			if (conversion_value == "" && conversion_value_1 == "") {

				that.getView().byId("idinputconversion_value_ReqCopyMat").setValueState("Error");
				that.getView().byId("idinputconversion_value1_ReqCopyMat").setValueState("Error");
				that.reviewFlag_ReqCopyMat = false;

			} else if (conversion_value == "") {

				that.getView().byId("idinputconversion_value_ReqCopyMat").setValueState("Error");
				that.reviewFlag_ReqCopyMat = false;

			} else if (conversion_value_1 == "") {

				that.getView().byId("idinputconversion_value1_ReqCopyMat").setValueState("Error");
				that.reviewFlag_ReqCopyMat = false;

			} else {

				that.getView().byId("idinputconversion_value_ReqCopyMat").setValueState("None");
				that.getView().byId("idinputconversion_value1_ReqCopyMat").setValueState("None");

			}

		}

		var remarks_spec_hand_value = that.getView().byId("idinputremarks_value_ReqCopyMat").getValue();

		var remarks_spec_hand_req = that.getView().byId("idinputremarks_label_ReqCopyMat").getRequired();

		//qm

		var qua_insp_check = that.getView().byId("idcheckboxqualityinspect_value_ReqCopyMat").getSelected();

		var qua_insp_req = that.getView().byId("idcheckboxqualityinspect_label_ReqCopyMat").getRequired();

		var batch_manag_check = that.getView().byId("idcheckboxbatchmanag_value_ReqCopyMat").getSelected();

		var batch_manag_req = that.getView().byId("idcheckboxbatchmanag_label_ReqCopyMat").getRequired();

		var shel_life_check = that.getView().byId("idcheckboxshelfile_value_ReqCopyMat").getSelected();

		var shel_life_check_req = that.getView().byId("idcheckboxshelfile_label_ReqCopyMat").getRequired();

	},

	z_app_spare_parts.z_spare_parts1.util.InputMatInformation.clearInputMatInformationReqCopyMat = function (that) {

		debugger;

		that.getView().byId("idinputusername_value_ReqCopyMat").setValue(""); //get value for input
		that.getView().byId("idinputusername_value_ReqCopyMat").setDescription("");

		that.getView().byId("idinputusername_label_ReqCopyMat").getRequired(); //label required

		that.getView().byId("idinputcontact_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputcontact_value_ReqCopyMat").setDescription("");

		var contact_req = that.getView().byId("idinputcontact_label_ReqCopyMat").getRequired();

		var eol_flag_check = that.getView().byId("idEOLFLAG_value_ReqCopyMat").setSelected(false);

		var eol_flag_check_req = that.getView().byId("idEOLFLAG_label_ReqCopyMat").getRequired();

		that.getView().byId("idplantinput_value_ReqCopyMat").setValue("");
		that.getView().byId("idplantinput_value_ReqCopyMat").setDescription("");

		var plant_req = that.getView().byId("idplantinput_label_ReqCopyMat").getRequired();

		that.getView().byId("idplantinput_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idinputpcn_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputpcn_value_ReqCopyMat").setDescription("");

		var purchase_code_num__req = that.getView().byId("idinputpcn_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputpcn_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idBaseUOMinput_value_ReqCopyMat").setValue("");
		that.getView().byId("idBaseUOMinput_value_ReqCopyMat").setDescription("");

		var buom__req = that.getView().byId("idBaseUOMinput_label_ReqCopyMat").getRequired();

		that.getView().byId("idBaseUOMinput_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idcomboboxconsumable_value_ReqCopyMat").setValue("");
		that.getView().byId("idcomboboxconsumable_value_ReqCopyMat").setDescription("");

		var consumable__req = that.getView().byId("idcomboboxconsumable_label_ReqCopyMat").getRequired();

		that.getView().byId("idcomboboxconsumable_value_ReqCopyMat").setValueState("None");

		//mrp

		that.getView().byId("idinputforecaseperiod_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputforecaseperiod_value_ReqCopyMat").setDescription("");

		var forcast_per_period__req = that.getView().byId("idinputforecaseperiod_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputquantityperbatch_value_ReqCopyMat").setValue("1");
		that.getView().byId("idinputquantityperbatch_value_ReqCopyMat").setDescription("");

		var quality_batch__req = that.getView().byId("idinputquantityperbatch_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputcostcenter_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputcostcenter_value_ReqCopyMat").setDescription("");

		var cost_centre__req = that.getView().byId("idinputcostcenter_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputperiod_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputperiod_value_ReqCopyMat").setDescription("");

		var period__req = that.getView().byId("idinputperiod_label_ReqCopyMat").getRequired();

		that.getView().byId("idcheckboxstoragronly_value_ReqCopyMat").setSelected(false);

		var storage_check_req = that.getView().byId("idcheckboxstoragronly_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputforecaseperiod_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idinputperiod_value_ReqCopyMat").setValueState("None");

		var remark_forecast_value = that.getView().byId("idinputremarkforcast_value_ReqCopyMat").setValue("");

		var remark_forecast_req = that.getView().byId("idinputremarkforcast_label_ReqCopyMat").getRequired();

		that.getView().byId("idcheckboxrepair_value_ReqCopyMat").setSelected(false);

		var repair_check_req = that.getView().byId("idcheckboxrepair_label_ReqCopyMat").getRequired();

		that.getView().byId("idcheckboxrepair_value_ReqCopyMat").setValueState("None");

		//pur
		//code for star mark in 1 and 2
		that.getView().byId("idinputfirstoemvendor_label_ReqCopyMat").setRequired(true);
		that.getView().byId("idinputoempartfirst_label_ReqCopyMat").setRequired(true);
		that.getView().byId("idinputsecondvendor_label_ReqCopyMat").setRequired(true);
		that.getView().byId("idinputoempartsecond_label_ReqCopyMat").setRequired(true);
		

		that.getView().byId("idinputfirstoemvendor_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputfirstoemvendor_value_ReqCopyMat").setDescription("");

		var oem_vendor_req = that.getView().byId("idinputfirstoemvendor_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputfirstoemvendor_value_ReqCopyMat").setValueState("None");

		var oem_part_value = that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValue("");

		var oem_part_req = that.getView().byId("idinputoempartfirst_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputoempartfirst_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idinputsecondvendor_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputsecondvendor_value_ReqCopyMat").setDescription("");

		var sec_vendor_req = that.getView().byId("idinputsecondvendor_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputsecondvendor_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setDescription("");

		var sec_part_req = that.getView().byId("idinputoempartsecond_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputoempartsecond_value_ReqCopyMat").setValueState("None");
		//udit------------------------------------------
		
		
		that.getView().byId("idinputthirdoemvendor_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputthirdoemvendor_value_ReqCopyMat").setDescription("");

		var sec_vendor_req = that.getView().byId("idinputthirdoemvendor_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputthirdoemvendor_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idinputoempartthird_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputoempartthird_value_ReqCopyMat").setDescription("");

		var sec_part_req = that.getView().byId("idinputoempartthird_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputoempartthird_value_ReqCopyMat").setValueState("None");
		
		
		
			that.getView().byId("idinputfourthvendor_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputfourthvendor_value_ReqCopyMat").setDescription("");
		var sec_vendor_req = that.getView().byId("idinputfourthvendor_label_ReqCopyMat").getRequired();
		that.getView().byId("idinputfourthvendor_value_ReqCopyMat").setValueState("None");
		that.getView().byId("idinputoempartfourth_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputoempartfourth_value_ReqCopyMat").setDescription("");
		var sec_part_req = that.getView().byId("idinputoempartfourth_label_ReqCopyMat").getRequired();
		that.getView().byId("idinputoempartfourth_value_ReqCopyMat").setValueState("None");
		
		
		
		
		
		

		that.getView().byId("idinputcriticalpart_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputcriticalpart_value_ReqCopyMat").setDescription("");

		var critical_req = that.getView().byId("idinputcriticalpart_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputcriticalpart_value_ReqCopyMat").setValueState("None");

		//fin

		that.getView().byId("idinputprofitcentre_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputprofitcentre_value_ReqCopyMat").setDescription("");

		var profit_cen_req = that.getView().byId("idinputprofitcentre_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputprofitcentre_value_ReqCopyMat").setValueState("None");

		//wh

		that.getView().byId("idcheckboxautserialno_value_ReqCopyMat").setSelected(false);

		var aut_serial_num_check_req = that.getView().byId("idcheckboxautserialno_label_ReqCopyMat").getRequired();

		that.getView().byId("idseriallevelinput_value_ReqCopyMat").setValueState("None");

		that.getView().byId("idinputuoi_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputuoi_value_ReqCopyMat").setDescription("");

		var UOI_req = that.getView().byId("idinputuoi_label_ReqCopyMat").getRequired();

		that.getView().byId("addstoreinputid_value_ReqCopyMat").setTokens([]);
		// that.getView().byId("addstoreinputid_value_ReqCopyMat").setValue("");

		var add_store_typ_req = that.getView().byId("addstoreinputid_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputserialnoprof_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputserialnoprof_value_ReqCopyMat").setDescription("");

		var serialnoproof_req = that.getView().byId("idinputserialnoprof_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputconversion_value_ReqCopyMat").setValue("");
		that.getView().byId("idinputconversion_value_ReqCopyMat").setDescription("");
		that.getView().byId("idinputconversion_value1_ReqCopyMat").setValue("");
		that.getView().byId("idinputconversion_value1_ReqCopyMat").setDescription("");

		var conversion_req = that.getView().byId("idinputconversion_label_ReqCopyMat").getRequired();

		that.getView().byId("idinputremarks_value_ReqCopyMat").setValue("");
		// that.getView().byId("idinputremarks_value_ReqCopyMat").setValue("");

		var remarks_spec_hand_req = that.getView().byId("idinputremarks_label_ReqCopyMat").getRequired();

		that.getView().byId("idseriallevelinput_value_ReqCopyMat").setValue("");
		that.getView().byId("idseriallevelinput_value_ReqCopyMat").setDescription("");

		var serial_level_req = that.getView().byId("idseriallevelinput_label_ReqCopyMat").getRequired();

		//qm

		that.getView().byId("idcheckboxqualityinspect_value_ReqCopyMat").setSelected(false);

		var qua_insp_req = that.getView().byId("idcheckboxqualityinspect_label_ReqCopyMat").getRequired();

		that.getView().byId("idcheckboxbatchmanag_value_ReqCopyMat").setSelected(false);

		// that.getView().byId("idcheckboxbatchmanag_label_ReqCopyMat").getRequired();

		that.getView().byId("idcheckboxshelfile_value_ReqCopyMat").setSelected(false);

		// that.getView().byId("idcheckboxshelfile_label_ReqNewMat").getRequired();
		that.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_COPY_MAT").setData("");
	//	that.getOwnerComponent().getModel("ATTACHMENT_MODEL_REQ_COPY_MAT").getData().results = [];

	},

	z_app_spare_parts.z_spare_parts1.util.InputMatInformation.getInputMatInformationReqCopyMat = function (oEvent, that) {

		debugger;

		busyDialog.open();

		// var oDataModelPCN = that.getOwnerComponent().getModel("oDataModelPCN");

		// oModel.read("/ZC_MM_PCN_LIST(p_appl='SPARE_PART')/Set", null, null, true,

		z_app_spare_parts.z_spare_parts1.util.InputMatInformation.formJSONFlatClassificationTree(that);

		$.support.cors = true;

		var oHeaders = {

			"X-Requested-With": "XMLHttpRequest",

			"X-CSRF-Token": "Fetch",

			"Content-Type": "application/atom+xml",

			"DataServiceVersion": "2.0",

			"Accept": "application/atom+xml"

		};

		var iGETUrl = that.getOwnerComponent().getModel("oDataModelSP").sServiceUrl;

		$.ajax({

			headers: oHeaders,

			url: "/sap/opu/odata/sap/ZMM_PUDB_SRV/header_dataSet",

			type: "GET",

			async: false,

			timeout: 100000,

			error: function (data, oResponse) {

				//                                           debugger;

				busyDialog.close();

				sap.m.MessageBox

					.error(" Data fetch failed");

			},

			success: function (data, textStatus, jqXHR) {

				debugger;

				var token = jqXHR.getResponseHeader('x-csrf-token');

				var dataFinal = [];

				var dataString = "";

				dataFinal

					.push("<?xml version='1.0' encoding='UTF-8'?>" + "<atom:entry  xmlns:atom='http://www.w3.org/2005/Atom' " +

					"xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' " +

					"xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'>" + "<atom:content type='application/xml'>" +

					"<m:properties>" + "<d:Message>Search</d:Message>" + "<d:Type>S</d:Type>" + "</m:properties>" + "</atom:content>");

				dataFinal

					.push(

					"<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/ET_HEADER_DATANav' type='application/atom+xml;type=feed' title='ZMM_SPARE_PARTS_SRV.classification2return'>" +

					"<m:inline>" + "<atom:feed>" + "<atom:entry>" + "<atom:content type='application/xml'>" + "<m:properties>" +

					"<d:Plant>WA00</d:Plant>" + "</m:properties>" + "</atom:content>" +

					"<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/ET_CLASSIF_DATANav' type='application/atom+xml;type=feed' title='ZMM_SPARE_PARTS_SRV.CLASSIFICATION'>" +

					"<m:inline>" + "<atom:feed>");

				//loop start here

				for (var e = 0; e < that.ClassificationTreeJSONFlatStrc.results.length; e++) {

					dataFinal

						.push("<atom:entry>" + "<atom:content type='application/xml'> <m:properties>" + "<d:Class>" + that.ClassificationTreeJSONFlatStrc.results[

							e].Class + "</d:Class>" + "<d:Atnam>" + that.ClassificationTreeJSONFlatStrc.results[e].Atnam + "</d:Atnam>" + "<d:Atwrt>" + that

						.ClassificationTreeJSONFlatStrc.results[e].Atwrt + "</d:Atwrt>" + "<d:Atkla>" + that.ClassificationTreeJSONFlatStrc.results[e].Atkla +

						"</d:Atkla>" + "</m:properties>" + "</atom:content>" + "</atom:entry>");

				}

				//loop end here

				dataFinal

					.push("</atom:feed>" + "</m:inline>" + "</atom:link>" + "</atom:entry>" + "</atom:feed>" + "</m:inline>" + "</atom:link>" +

					"</atom:entry>");

				debugger;

				var FinalData = '';

				var Final = '';

				for (var i = 0; i < dataFinal.length; i++) {

					FinalData = dataFinal.join('');

					// FinalData =

					// FinalData.replace(/\\/g, '')

				}

				var myHeadersend = {

					"X-Requested-With": "XMLHttpRequest",

					"Content-Type": "application/atom+xml",

					"DataServiceVersion": "2.0",

					"Accept": "application/json,application/atom+xml,application/xml,application/atomsvc+xml",

					"X-CSRF-Token": token

				};

				var iPOSTUrl = iGETUrl + "/ET_RETURNSet";

				$.ajax({

					headers: myHeadersend,

					url: iPOSTUrl,

					type: "POST",

					data: FinalData,

					// // processData: false,

					async: false,

					error: function (data, oResponse) {

						busyDialog.close();

						sap.m.MessageBox

							.error(" Data fetch failed");

					},

					success: function (data, oResponse) {

						debugger;

						that.getOwnerComponent().getModel("tableModel").setData(data.d.ET_HEADER_DATANav);

						busyDialog.close();

					}

				});

			}

		});

	};

z_app_spare_parts.z_spare_parts1.util.InputMatInformation.loadInputMatInformationPlantExtension = function (that) {

		debugger;
		var oRequestCopyMaterialModelData = that.getOwnerComponent().getModel("oRequestCopyMaterialModel").getData().results[0]; //complete json

		// that.getView().byId("idinputusername_value_PlantExtension").setValue(oRequestCopyMaterialModelData.); //get value for input
		// that.getView().byId("idinputcontact_value_PlantExtension").setValue(oRequestCopyMaterialModelData.Contact);
		that.getView().byId("idplantinput_value_PlantExtension").setValue(oRequestCopyMaterialModelData.Werks);
		that.selectedPlant = oRequestCopyMaterialModelData.Werks;
		that.getView().byId("idinputpcn_value_PlantExtension").setValue(oRequestCopyMaterialModelData.Matkl);
		that.getView().byId("idBaseUOMinput_value_PlantExtension").setValue(oRequestCopyMaterialModelData.Meins);
		that.getView().byId("idcomboboxconsumable_value_PlantExtension").setValue(oRequestCopyMaterialModelData.ValClass);
		//mrp commented by Udit
	//	that.getView().byId("idinputforecaseperiod_value_PlantExtension").setValue(oRequestCopyMaterialModelData.ForcstPer);
		// that.getView().byId("idinputquantityperbatch_value_PlantExtension").setValue(oRequestCopyMaterialModelData.);
		that.getView().byId("idinputcostcenter_value_PlantExtension").setValue(oRequestCopyMaterialModelData.Kostl);
		that.getView().byId("idinputperiod_value_PlantExtension").setValue(oRequestCopyMaterialModelData.Period);
		that.getView().byId("idinputremarkforcast_value_PlantExtension").setValue(oRequestCopyMaterialModelData.ForRemrk);
		//pur
		that.getView().byId("idinputfirstoemvendor_value_PlantExtension").setValue(oRequestCopyMaterialModelData.OemVend);
		that.getView().byId("idinputoempartfirst_value_PlantExtension").setValue(oRequestCopyMaterialModelData.OemPart);
		that.getView().byId("idinputsecondvendor_value_PlantExtension").setValue(oRequestCopyMaterialModelData.OemVend2);
		that.getView().byId("idinputoempartsecond_value_PlantExtension").setValue(oRequestCopyMaterialModelData.OemPart2);
		that.getView().byId("idinputcriticalpart_value_PlantExtension").setValue(oRequestCopyMaterialModelData.CritPart);
		
		
		// added by Udit--------------------------------------------------------------------------
		that.getView().byId("idinputthirdoemvendor_value_PlantExtension").setValue(oRequestCopyMaterialModelData.OemVend3);
		that.getView().byId("idinputoempartthird_value_PlantExtension").setValue(oRequestCopyMaterialModelData.OemPart3);
		that.getView().byId("idinputfourthvendor_value_PlantExtension").setValue(oRequestCopyMaterialModelData.OemVend4);
		that.getView().byId("idinputoempartfourth_value_PlantExtension").setValue(oRequestCopyMaterialModelData.OemPart4);
		
		
		//fin
		that.getView().byId("idinputprofitcentre_value_PlantExtension").setValue(oRequestCopyMaterialModelData.Prctr);
		//wh
		that.getView().byId("idinputuoi_value_PlantExtension").setValue(oRequestCopyMaterialModelData.Msehi);
		// that.getView().byId("addstoreinputid_value_PlantExtension").setValue(oRequestCopyMaterialModelData.);
		that.getView().byId("idinputserialnoprof_value_PlantExtension").setValue(oRequestCopyMaterialModelData.Serail);

		that.getView().byId("idinputconversion_value_PlantExtension").setValue(oRequestCopyMaterialModelData.Conv);
		that.getView().byId("idinputconversion_value_PlantExtension").setDescription(oRequestCopyMaterialModelData.Meins);
		that.getView().byId("idinputconversion_value1_PlantExtension").setValue(oRequestCopyMaterialModelData.Conv);
		that.getView().byId("idinputconversion_value1_PlantExtension").setDescription(oRequestCopyMaterialModelData.Msehi);

		that.getView().byId("idinputremarks_value_PlantExtension").setValue(oRequestCopyMaterialModelData.WhRemrk);
		that.getView().byId("idseriallevelinput_value_PlantExtension").setValue(oRequestCopyMaterialModelData.Serlv);
		that.getView().byId("idReqComment_value_PlantExtension").setValue(oRequestCopyMaterialModelData.ReqComment);

	},
	z_app_spare_parts.z_spare_parts1.util.InputMatInformation.clearInputMatInformationPlantExtension = function (that) {

		debugger;

		that.getView().byId("idinputusername_value_PlantExtension").setValue(""); //get value for input
		that.getView().byId("idinputusername_value_PlantExtension").setDescription("");

		that.getView().byId("idinputusername_label_PlantExtension").getRequired(); //label required

		that.getView().byId("idinputcontact_value_PlantExtension").setValue("");
		that.getView().byId("idinputcontact_value_PlantExtension").setDescription("");

		var contact_req = that.getView().byId("idinputcontact_label_PlantExtension").getRequired();

		var eol_flag_check = that.getView().byId("idEOLFLAG_value_PlantExtension").setSelected(false);

		var eol_flag_check_req = that.getView().byId("idEOLFLAG_label_PlantExtension").getRequired();

		that.getView().byId("idplantinput_value_PlantExtension").setValue("");
		that.getView().byId("idplantinput_value_PlantExtension").setDescription("");

		var plant_req = that.getView().byId("idplantinput_label_PlantExtension").getRequired();

		that.getView().byId("idplantinput_value_PlantExtension").setValueState("None");

		that.getView().byId("idinputpcn_value_PlantExtension").setValue("");
		that.getView().byId("idinputpcn_value_PlantExtension").setDescription("");

		var purchase_code_num__req = that.getView().byId("idinputpcn_label_PlantExtension").getRequired();

		that.getView().byId("idinputpcn_value_PlantExtension").setValueState("None");

		that.getView().byId("idBaseUOMinput_value_PlantExtension").setValue("");
		that.getView().byId("idBaseUOMinput_value_PlantExtension").setDescription("");

		var buom__req = that.getView().byId("idBaseUOMinput_label_PlantExtension").getRequired();

		that.getView().byId("idBaseUOMinput_value_PlantExtension").setValueState("None");

		that.getView().byId("idcomboboxconsumable_value_PlantExtension").setValue("");
		that.getView().byId("idcomboboxconsumable_value_PlantExtension").setDescription("");

		var consumable__req = that.getView().byId("idcomboboxconsumable_label_PlantExtension").getRequired();

		that.getView().byId("idcomboboxconsumable_value_PlantExtension").setValueState("None");
		//mrp
		that.getView().byId("idinputforecaseperiod_value_PlantExtension").setValue("");
		that.getView().byId("idinputforecaseperiod_value_PlantExtension").setDescription("");

		var forcast_per_period__req = that.getView().byId("idinputforecaseperiod_label_PlantExtension").getRequired();

		that.getView().byId("idinputquantityperbatch_value_PlantExtension").setValue("1");
		that.getView().byId("idinputquantityperbatch_value_PlantExtension").setDescription("");

		var quality_batch__req = that.getView().byId("idinputquantityperbatch_label_PlantExtension").getRequired();

		that.getView().byId("idinputcostcenter_value_PlantExtension").setValue("");
		that.getView().byId("idinputcostcenter_value_PlantExtension").setDescription("");

		var cost_centre__req = that.getView().byId("idinputcostcenter_label_PlantExtension").getRequired();

		that.getView().byId("idinputperiod_value_PlantExtension").setValue("");
		that.getView().byId("idinputperiod_value_PlantExtension").setDescription("");

		var period__req = that.getView().byId("idinputperiod_label_PlantExtension").getRequired();

		that.getView().byId("idcheckboxstoragronly_value_PlantExtension").setSelected(false);

		var storage_check_req = that.getView().byId("idcheckboxstoragronly_label_PlantExtension").getRequired();

		that.getView().byId("idinputforecaseperiod_value_PlantExtension").setValueState("None");

		that.getView().byId("idinputperiod_value_PlantExtension").setValueState("None");

		var remark_forecast_value = that.getView().byId("idinputremarkforcast_value_PlantExtension").setValue("");

		var remark_forecast_req = that.getView().byId("idinputremarkforcast_label_PlantExtension").getRequired();

		that.getView().byId("idcheckboxrepair_value_PlantExtension").setSelected(false);

		var repair_check_req = that.getView().byId("idcheckboxrepair_label_PlantExtension").getRequired();

		that.getView().byId("idcheckboxrepair_value_PlantExtension").setValueState("None");

		//pur

		that.getView().byId("idinputfirstoemvendor_value_PlantExtension").setValue("");
		that.getView().byId("idinputfirstoemvendor_value_PlantExtension").setDescription("");

		var oem_vendor_req = that.getView().byId("idinputfirstoemvendor_label_PlantExtension").getRequired();

		that.getView().byId("idinputfirstoemvendor_value_PlantExtension").setValueState("None");

		var oem_part_value = that.getView().byId("idinputoempartfirst_value_PlantExtension").setValue("");

		var oem_part_req = that.getView().byId("idinputoempartfirst_label_PlantExtension").getRequired();

		that.getView().byId("idinputoempartfirst_value_PlantExtension").setValueState("None");

		that.getView().byId("idinputsecondvendor_value_PlantExtension").setValue("");
		that.getView().byId("idinputsecondvendor_value_PlantExtension").setDescription("");

		var sec_vendor_req = that.getView().byId("idinputsecondvendor_label_PlantExtension").getRequired();

		that.getView().byId("idinputsecondvendor_value_PlantExtension").setValueState("None");

		that.getView().byId("idinputoempartsecond_value_PlantExtension").setValue("");
		that.getView().byId("idinputoempartsecond_value_PlantExtension").setDescription("");

		var sec_part_req = that.getView().byId("idinputoempartsecond_label_PlantExtension").getRequired();

		that.getView().byId("idinputoempartsecond_value_PlantExtension").setValueState("None");

		//new req for adding third and fourth vendor and part number TB 28-1-19
		that.getView().byId("idinputthirdoemvendor_value_PlantExtension").setValue("");
		that.getView().byId("idinputthirdoemvendor_value_PlantExtension").setDescription("");
		that.getView().byId("idinputthirdoemvendor_value_PlantExtension").setValueState("None");

		that.getView().byId("idinputfourthvendor_value_PlantExtension").setValue("");
		that.getView().byId("idinputfourthvendor_value_PlantExtension").setDescription("");
		that.getView().byId("idinputfourthvendor_value_PlantExtension").setValueState("None");

		that.getView().byId("idinputoempartthird_value_PlantExtension").setValue("");
		that.getView().byId("idinputoempartthird_value_PlantExtension").setDescription("");
		that.getView().byId("idinputoempartthird_value_PlantExtension").setValueState("None");

		that.getView().byId("idinputoempartfourth_value_PlantExtension").setValue("");
		that.getView().byId("idinputoempartfourth_value_PlantExtension").setDescription("");
		that.getView().byId("idinputoempartfourth_value_PlantExtension").setValueState("None");

		//new req for adding third and fourth vendor and part number TB 28-1-19

		that.getView().byId("idinputcriticalpart_value_PlantExtension").setValue("");
		that.getView().byId("idinputcriticalpart_value_PlantExtension").setDescription("");

		var critical_req = that.getView().byId("idinputcriticalpart_label_PlantExtension").getRequired();

		that.getView().byId("idinputcriticalpart_value_PlantExtension").setValueState("None");

		//fin

		that.getView().byId("idinputprofitcentre_value_PlantExtension").setValue("");
		that.getView().byId("idinputprofitcentre_value_PlantExtension").setDescription("");

		var profit_cen_req = that.getView().byId("idinputprofitcentre_label_PlantExtension").getRequired();

		that.getView().byId("idinputprofitcentre_value_PlantExtension").setValueState("None");

		//wh

		that.getView().byId("idcheckboxautserialno_value_PlantExtension").setSelected(false);

		var aut_serial_num_check_req = that.getView().byId("idcheckboxautserialno_label_PlantExtension").getRequired();

		that.getView().byId("idseriallevelinput_value_PlantExtension").setValueState("None");

		that.getView().byId("idinputuoi_value_PlantExtension").setValue("");
		that.getView().byId("idinputuoi_value_PlantExtension").setDescription("");

		var UOI_req = that.getView().byId("idinputuoi_label_PlantExtension").getRequired();

		that.getView().byId("addstoreinputid_value_PlantExtension").setTokens([]);
		// that.getView().byId("addstoreinputid_value_PlantExtension").setValue("");

		var add_store_typ_req = that.getView().byId("addstoreinputid_label_PlantExtension").getRequired();

		that.getView().byId("idinputserialnoprof_value_PlantExtension").setValue("");
		that.getView().byId("idinputserialnoprof_value_PlantExtension").setDescription("");

		var serialnoproof_req = that.getView().byId("idinputserialnoprof_label_PlantExtension").getRequired();

		that.getView().byId("idinputconversion_value_PlantExtension").setValue("");
		that.getView().byId("idinputconversion_value_PlantExtension").setDescription("");
		that.getView().byId("idinputconversion_value1_PlantExtension").setValue("");
		that.getView().byId("idinputconversion_value1_PlantExtension").setDescription("");

		var conversion_req = that.getView().byId("idinputconversion_label_PlantExtension").getRequired();

		that.getView().byId("idinputremarks_value_PlantExtension").setValue("");
		// that.getView().byId("idinputremarks_value_PlantExtension").setValue("");

		var remarks_spec_hand_req = that.getView().byId("idinputremarks_label_PlantExtension").getRequired();

		that.getView().byId("idseriallevelinput_value_PlantExtension").setValue("");
		that.getView().byId("idseriallevelinput_value_PlantExtension").setDescription("");

		var serial_level_req = that.getView().byId("idseriallevelinput_label_PlantExtension").getRequired();

		//qm

		that.getView().byId("idcheckboxqualityinspect_value_PlantExtension").setSelected(false);

		var qua_insp_req = that.getView().byId("idcheckboxqualityinspect_label_PlantExtension").getRequired();

		that.getView().byId("idcheckboxbatchmanag_value_PlantExtension").setSelected(false);

		// that.getView().byId("idcheckboxbatchmanag_label_PlantExtension").getRequired();

		that.getView().byId("idcheckboxshelfile_value_PlantExtension").setSelected(false);

		// that.getView().byId("idcheckboxshelfile_label_ReqNewMat").getRequired();
		that.getOwnerComponent().getModel("ATTACHMENT_MODEL_PLANT_EXT").setData("");

	},
	z_app_spare_parts.z_spare_parts1.util.InputMatInformation.reviewInputMatInformationPlantExtension = function (that) {

		debugger;

		var user_name_value = that.getView().byId("idinputusername_value_PlantExtension").getValue(); //get value for input

		var user_name_req = that.getView().byId("idinputusername_label_PlantExtension").getRequired(); //label required

		var contact_value = that.getView().byId("idinputcontact_value_PlantExtension").getValue();

		var contact_req = that.getView().byId("idinputcontact_label_PlantExtension").getRequired();

		var eol_flag_check = that.getView().byId("idEOLFLAG_value_PlantExtension").getSelected();

		var eol_flag_check_req = that.getView().byId("idEOLFLAG_label_PlantExtension").getRequired();

		var plant_value = that.getView().byId("idplantinput_value_PlantExtension").getValue();

		var plant_req = that.getView().byId("idplantinput_label_PlantExtension").getRequired();

		if (plant_req == true) {

			if (plant_value == "") {

				that.getView().byId("idplantinput_value_PlantExtension").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idplantinput_value_PlantExtension").setValueState("None");

			}

		}

		var purchase_code_num_value = that.getView().byId("idinputpcn_value_PlantExtension").getValue();

		var purchase_code_num__req = that.getView().byId("idinputpcn_label_PlantExtension").getRequired();

		if (purchase_code_num__req == true) {

			if (purchase_code_num_value == "") {

				that.getView().byId("idinputpcn_value_PlantExtension").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputpcn_value_PlantExtension").setValueState("None");

			}

		}

		var buom_value = that.getView().byId("idBaseUOMinput_value_PlantExtension").getValue();

		var buom__req = that.getView().byId("idBaseUOMinput_label_PlantExtension").getRequired();

		if (buom__req == true) {

			if (buom_value == "") {

				that.getView().byId("idBaseUOMinput_value_PlantExtension").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idBaseUOMinput_value_PlantExtension").setValueState("None");

			}

		}

		var consumable_value = that.getView().byId("idcomboboxconsumable_value_PlantExtension").getValue();

		var consumable__req = that.getView().byId("idcomboboxconsumable_label_PlantExtension").getRequired();

		if (consumable__req == true) {

			if (consumable_value == "") {

				that.getView().byId("idcomboboxconsumable_value_PlantExtension").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idcomboboxconsumable_value_PlantExtension").setValueState("None");

			}

		}

		//mrp

		var forcast_per_period_value = that.getView().byId("idinputforecaseperiod_value_PlantExtension").getValue();
		if (forcast_per_period_value == 0 && storage_check == false) {

			that.getView().byId("idinputforecaseperiod_value_PlantExtension").setValueState("Error");
			that.getView().byId("idinputforecaseperiod_value_PlantExtension").setValueStateText("Value Cannot be Zero");
			sap.m.MessageBox.error(" Value Cannot be Zero for Forecast period");
			that.reviewFlag_PlantExtension = false;

		} else {

			that.getView().byId("idinputforecaseperiod_value_PlantExtension").setValueState("None");
			that.getView().byId("idinputforecaseperiod_value_PlantExtension").setValueStateText("");

		}

		var forcast_per_period__req = that.getView().byId("idinputforecaseperiod_label_PlantExtension").getRequired();

		var quality_batch_value = that.getView().byId("idinputquantityperbatch_value_PlantExtension").getValue();

		var quality_batch__req = that.getView().byId("idinputquantityperbatch_label_PlantExtension").getRequired();

		var cost_centre_value = that.getView().byId("idinputcostcenter_value_PlantExtension").getValue();

		var cost_centre__req = that.getView().byId("idinputcostcenter_label_PlantExtension").getRequired();

		var period_value = that.getView().byId("idinputperiod_value_PlantExtension").getValue();

		var period__req = that.getView().byId("idinputperiod_label_PlantExtension").getRequired();

		var storage_check = that.getView().byId("idcheckboxstoragronly_value_PlantExtension").getSelected();

		var storage_check_req = that.getView().byId("idcheckboxstoragronly_label_PlantExtension").getRequired();

		// if (storage_check_req == false) {

		if (storage_check == false) {

			if (forcast_per_period_value == "" && period_value == "") {
				that.getView().byId("idinputforecaseperiod_value_PlantExtension").setValueState("Error");
				that.getView().byId("idinputperiod_value_PlantExtension").setValueState("Error");
				that.reviewFlag_PlantExtension = false;
			} else if (forcast_per_period_value == "") {
				that.getView().byId("idinputforecaseperiod_value_PlantExtension").setValueState("Error");
				that.reviewFlag_PlantExtension = false;
			} else if (period_value == "") {
				that.getView().byId("idinputperiod_value_PlantExtension").setValueState("Error");
				that.reviewFlag_PlantExtension = false;
			}

		} else {

			that.getView().byId("idinputforecaseperiod_value_PlantExtension").setValueState("None");

			that.getView().byId("idinputperiod_value_PlantExtension").setValueState("None");

		}

		// }

		var remark_forecast_value = that.getView().byId("idinputremarkforcast_value_PlantExtension").getValue();

		var remark_forecast_req = that.getView().byId("idinputremarkforcast_label_PlantExtension").getRequired();

		var repair_check = that.getView().byId("idcheckboxrepair_value_PlantExtension").getSelected();

		var repair_check_req = that.getView().byId("idcheckboxrepair_label_PlantExtension").getRequired();

		if (repair_check_req == true) {

			if (repair_check == true) {

				that.getView().byId("idcheckboxrepair_value_PlantExtension").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idcheckboxrepair_value_PlantExtension").setValueState("None");

			}

		}

		//pur

		var oem_vendor_value = that.getView().byId("idinputfirstoemvendor_value_PlantExtension").getValue();

		var oem_vendor_req = that.getView().byId("idinputfirstoemvendor_label_PlantExtension").getRequired();

		if (oem_vendor_req == true) {

			if (oem_vendor_value == "") {

				that.getView().byId("idinputfirstoemvendor_value_PlantExtension").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputfirstoemvendor_value_PlantExtension").setValueState("None");

			}

		}

		var oem_part_value = that.getView().byId("idinputoempartfirst_value_PlantExtension").getValue();

		var oem_part_req = that.getView().byId("idinputoempartfirst_label_PlantExtension").getRequired();

		if (oem_part_req == true) {

			if (oem_part_value == "") {

				that.getView().byId("idinputoempartfirst_value_PlantExtension").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputoempartfirst_value_PlantExtension").setValueState("None");

			}

		}

		var sec_vendor_value = that.getView().byId("idinputsecondvendor_value_PlantExtension").getValue();

		var sec_vendor_req = that.getView().byId("idinputsecondvendor_label_PlantExtension").getRequired();

		if (sec_vendor_req == true) {

			if (sec_vendor_value == "") {

				that.getView().byId("idinputsecondvendor_value_PlantExtension").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputsecondvendor_value_PlantExtension").setValueState("None");

			}

		}

		var sec_part_value = that.getView().byId("idinputoempartsecond_value_PlantExtension").getValue();

		var sec_part_req = that.getView().byId("idinputoempartsecond_label_PlantExtension").getRequired();

		if (sec_part_req == true) {

			if (sec_part_value == "") {

				that.getView().byId("idinputoempartsecond_value_PlantExtension").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputoempartsecond_value_PlantExtension").setValueState("None");

			}

		}
		
		
		
		//third and fourth by Udit for Plant 
		
		var third_vendor_value = that.getView().byId("idinputthirdoemvendor_value_PlantExtension").getValue();

		var third_vendor_req = that.getView().byId("idinputthirdoemvendor_label_PlantExtension").getRequired();

		if (third_vendor_req == true) {

			if (third_vendor_value == "") {

				that.getView().byId("idinputthirdoemvendor_value_PlantExtension").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputthirdoemvendor_value_PlantExtension").setValueState("None");

			}

		}

		var third_part_value = that.getView().byId("idinputoempartthird_value_PlantExtension").getValue();

		var third_part_req = that.getView().byId("idinputoempartthird_label_PlantExtension").getRequired();

		if (third_part_req == true) {

			if (third_part_value == "") {

				that.getView().byId("idinputoempartthird_value_PlantExtension").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputoempartthird_value_PlantExtension").setValueState("None");

			}

		}

		var fourth_vendor_value = that.getView().byId("idinputfourthvendor_value_PlantExtension").getValue();

		var fourth_vendor_req = that.getView().byId("idinputfourthvendor_label_PlantExtension").getRequired();

		if (fourth_vendor_req == true) {

			if (fourth_vendor_value == "") {

				that.getView().byId("idinputfourthvendor_value_PlantExtension").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputfourthvendor_value_PlantExtension").setValueState("None");

			}

		}

		var fourth_part_value = that.getView().byId("idinputoempartfourth_value_PlantExtension").getValue();

		var fourth_part_req = that.getView().byId("idinputoempartfourth_label_PlantExtension").getRequired();

		if (fourth_part_req == true) {

			if (fourth_part_value == "") {

				that.getView().byId("idinputoempartfourth_value_PlantExtension").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputoempartfourth_value_PlantExtension").setValueState("None");

			}

		}
		

		var critical_value = that.getView().byId("idinputcriticalpart_value_PlantExtension").getValue();

		var critical_req = that.getView().byId("idinputcriticalpart_label_PlantExtension").getRequired();

		if (critical_req == true) {

			if (critical_value == "") {

				that.getView().byId("idinputcriticalpart_value_PlantExtension").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputcriticalpart_value_PlantExtension").setValueState("None");

			}

		}

		//fin

		var profit_cen_value = that.getView().byId("idinputprofitcentre_value_PlantExtension").getValue();

		var profit_cen_req = that.getView().byId("idinputprofitcentre_label_PlantExtension").getRequired();

		if (profit_cen_req == true) {

			if (profit_cen_value == "") {

				that.getView().byId("idinputprofitcentre_value_PlantExtension").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputprofitcentre_value_PlantExtension").setValueState("None");

			}

		}

		//wh

		var serialnoproof_value = that.getView().byId("idinputserialnoprof_value_PlantExtension").getValue();

		var serialnoproof_req = that.getView().byId("idinputserialnoprof_label_PlantExtension").getRequired();

		var serial_level_hand_value = that.getView().byId("idseriallevelinput_value_PlantExtension").getValue();

		var serial_level_req = that.getView().byId("idseriallevelinput_label_PlantExtension").getRequired();

		var aut_serial_num_check = that.getView().byId("idcheckboxautserialno_value_PlantExtension").getSelected();

		var aut_serial_num_check_req = that.getView().byId("idcheckboxautserialno_label_PlantExtension").getRequired();

		if (aut_serial_num_check == true) {

			if (serialnoproof_value == "" && serial_level_hand_value == "") {
				that.getView().byId("idinputserialnoprof_value_PlantExtension").setValueState("Error");
				that.getView().byId("idseriallevelinput_value_PlantExtension").setValueState("Error");
				that.reviewFlag_PlantExtension = false;
			} else if (serialnoproof_value == "") {
				that.getView().byId("idinputserialnoprof_value_PlantExtension").setValueState("Error");
				that.reviewFlag_PlantExtension = false;
			} else if (serial_level_hand_value == "") {
				that.getView().byId("idseriallevelinput_value_PlantExtension").setValueState("Error");
				that.reviewFlag_PlantExtension = false;
			}

		} else {

			that.getView().byId("idinputserialnoprof_value_PlantExtension").setValueState("None");
			that.getView().byId("idseriallevelinput_value_PlantExtension").setValueState("None");

		}

		var UOI_value = that.getView().byId("idinputuoi_value_PlantExtension").getValue();

		var UOI_req = that.getView().byId("idinputuoi_label_PlantExtension").getRequired();

		if (UOI_req == true) {

			if (UOI_value == "") {

				that.getView().byId("idinputuoi_value_PlantExtension").setValueState("Error");

				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputuoi_value_PlantExtension").setValueState("None");

			}

		}

		var add_store_typ_value = that.getView().byId("addstoreinputid_value_PlantExtension").getTokens();

		var add_store_typ_req = that.getView().byId("addstoreinputid_label_PlantExtension").getRequired();
		if (that.byId("addstoreinputid_value_PlantExtension").getTokens().length > 10) {
			that.getView().byId("addstoreinputid_value_PlantExtension").setValueState("Error");
			that.reviewFlag_ReqNewMat = false;
			that.getView().byId("addstoreinputid_value_PlantExtension").setValueStateText(" Please select only 10 Storage Locations");
		}

		var serialnoproof_value = that.getView().byId("idinputserialnoprof_value_PlantExtension").getValue();

		var serialnoproof_req = that.getView().byId("idinputserialnoprof_label_PlantExtension").getRequired();

		var conversion_value = that.getView().byId("idinputconversion_value_PlantExtension").getValue();
		var conversion_req = that.getView().byId("idinputconversion_label_PlantExtension").getRequired();
		var conversion_value_1 = that.getView().byId("idinputconversion_value1_PlantExtension").getValue();

		if (conversion_req == true) {

			if (conversion_value == "" && conversion_value_1 == "") {

				that.getView().byId("idinputconversion_value_PlantExtension").setValueState("Error");
				that.getView().byId("idinputconversion_value1_PlantExtension").setValueState("Error");
				that.reviewFlag_PlantExtension = false;

			} else if (conversion_value == "") {

				that.getView().byId("idinputconversion_value_PlantExtension").setValueState("Error");
				that.reviewFlag_PlantExtension = false;

			} else if (conversion_value_1 == "") {

				that.getView().byId("idinputconversion_value1_PlantExtension").setValueState("Error");
				that.reviewFlag_PlantExtension = false;

			} else {

				that.getView().byId("idinputconversion_value_PlantExtension").setValueState("None");
				that.getView().byId("idinputconversion_value1_PlantExtension").setValueState("None");

			}

		}

		var remarks_spec_hand_value = that.getView().byId("idinputremarks_value_PlantExtension").getValue();

		var remarks_spec_hand_req = that.getView().byId("idinputremarks_label_PlantExtension").getRequired();

		var serial_level_hand_value = that.getView().byId("idseriallevelinput_value_PlantExtension").getValue();

		var serial_level_req = that.getView().byId("idseriallevelinput_label_PlantExtension").getRequired();

		//qm

		var qua_insp_check = that.getView().byId("idcheckboxqualityinspect_value_PlantExtension").getSelected();

		var qua_insp_req = that.getView().byId("idcheckboxqualityinspect_label_PlantExtension").getRequired();

		var batch_manag_check = that.getView().byId("idcheckboxbatchmanag_value_PlantExtension").getSelected();

		var batch_manag_req = that.getView().byId("idcheckboxbatchmanag_label_PlantExtension").getRequired();

		var shel_life_check = that.getView().byId("idcheckboxshelfile_value_PlantExtension").getSelected();

		var shel_life_check_req = that.getView().byId("idcheckboxshelfile_label_PlantExtension").getRequired();

	};