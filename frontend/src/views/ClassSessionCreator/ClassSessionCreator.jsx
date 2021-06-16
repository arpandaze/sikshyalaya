import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, FieldArray, Field } from "formik";
import CustomTextField from "../../components/CustomTextField";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import Button from "../../components/Button";
import { BiMinus } from "react-icons/bi";
import * as yup from "yup";
import { GoPlus } from "react-icons/go";
import colorscheme from "../../utils/colors";
import "./statics/css/classSessionCreator.css";
import useAPI from "../../utils/useAPI.jsx";
import { UserContext } from "../../utils/Contexts/UserContext.jsx";
import { get } from "idb-keyval";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import callAPI from "../../utils/API.jsx";
import ConditionalRendering from "../../components/ConditionalRendering";
import { DateTimePicker } from "../../components/CustomDateTime";
import { DropzoneDialog } from "material-ui-dropzone";
import { BsFileZip } from "react-icons/bs";
import ResourceIcons from "../../components/ResourceIcons";
import { ImCross } from "react-icons/im";
import { BsFilePlus } from "react-icons/bs";

const validationSchema = yup.object({
  start_time: yup.date().required("Start time is required!"),
  end_time: yup.date().required("End time is required!"),
});

const ClassSessionCreator = () => {
  const [selectFile, setSelectedFile] = useState([]);
  const { user } = useContext(UserContext);
  const [pageState, setPageState] = useState(1);
  const [uploadPopUp, setUploadPopUp] = useState(false);

  const [group, setGroup] = useState(null);

  const handleUploadOpen = () => {
    setUploadPopUp(true);
  };
  const handleUploadClose = () => {
    setUploadPopUp(false);
  };

  const handleUploadSave = (files) => {
    setSelectedFile([...selectFile, ...files]);
    setUploadPopUp(false);
  };
  const onDeleteUploadItem = (index) => {
    let temp = [...selectFile];
    temp.splice(index, 1);
    setSelectedFile(temp);
  };
  const getFileType = (item) => {
    switch (item) {
      case "application/msword":
        return "document";
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "document";
        break;
      case "image/jpeg":
        return "image";
        break;
      case "image/png":
        return "image";
        break;
      case "application/pdf":
        return "pdf";
        break;
      case "application/vnd.ms-powerpoint":
        return "presentation";
        break;
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return "presentation";
        break;
      case "application/vnd.rar":
        return "zip";
        break;
      case "application/x-tar":
        return "zip";
        break;
      case "application/zip":
        return "zip";
        break;
      case "application/x-7z-compressed":
        return "zip";
        break;
    }
  };
  const teacherFormatter = (values) => {
    return values.data.map((item) => {
      return {
        id: item.id,
        name: item.full_name,
      };
    });
  };

  const [teacher] = useAPI(
    { endpoint: "/api/v1/users/teacher" },
    teacherFormatter,
    []
  );

  const onSubmit = async (values) => {
    let formData = new FormData();
    formData.append("start_time", values.start_time.toISOString());
    formData.append("end_time", values.end_time.toISOString());
    if (values.instructors) {
      values.instructors.map((instructor) => {
        formData.append("instructor", instructor);
      });
    }
    formData.append("group", values.group);
    formData.append("description", values.description);
    if (selectFile) {
      [...selectFile].map((item) => {
        formData.append("file", item);
      });
    }

    let resp = await callAPI({
      endpoint: "/api/v1/class_session",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (resp.status == 200) {
      setPageState(2);
    }
  };
  return (
		<>
			<DashboardLayout>
				<ConditionalRendering condition={pageState == 1}>
					<Grid
						container
						direction="column"
						alignItems="flex-start"
						justify="flex-start"
						className="classSession_root"
					>
						<Grid item className="classSession_heading">
							<a className="classSession_headingText">Create Class Session</a>
						</Grid>
						<Grid item className="classSession_body">
							<Formik
								initialValues={{
									start_time: null,
									end_time: null,
									group: "",
									description: "",
									instructors: [],
								}}
								enableReinitialize={true}
								onSubmit={onSubmit}
							>
								{({ values, setFieldValue }) => (
									<>
										<Form>
											<Grid
												item
												className="classSession_dateTimePickerContainerOuter"
											>
												<Grid
													container
													direction="row"
													alignItems="center"
													justify="center"
													className="classSession_dateTimePickerContainer"
													spacing={3}
												>
													<Grid item>
														<DateTimePicker
															id="start_time"
															label="Start Time"
														/>
													</Grid>
													<Grid item>
														<DateTimePicker id="end_time" label="End Time" />
													</Grid>
												</Grid>
											</Grid>
											<Grid
												item
												className="classSession_instructorContainerOuter"
											>
												<Grid
													container
													direction="column"
													alignItems="center"
													justify="center"
													className="classSession_instructorContainer"
												>
													<FieldArray name="instructors">
														{(arrayHelpers) => (
															<>
																{values.instructors &&
																	values.instructors.length !== 0 &&
																	values.instructors.map(
																		(instructor, index) => (
																			<>
																				<div key={index}>
																					<Grid
																						item
																						className="classSession_instructorFieldOuter"
																					>
																						<Grid
																							container
																							direction="row"
																							className="classSession_instructorField"
																							alignItems="center"
																							justify="center"
																						>
																							<Grid
																								item
																								xs={10}
																								className="classSession_instructorFieldInner"
                                              >
																								<Autocomplete
																									id="combo-box-demo"
																									options={teacher}
																									getOptionLabel={(option) =>
																										option.name
																									}
																									onChange={(e, value) => {
																										arrayHelpers.replace(
																											index,
																											value.id
                                                    );
																									}}
																									style={{ width: 300 }}
																									renderInput={(params) => (
																										<TextField
																											{...params}
																											name={`instructors[${index}]`}
																											placeHolder="Add Other Instructors"
																											addStyles="classSession_inputField"
																											label="Instructor"
																											variant="outlined"
																										/>
																									)}
																								/>
																							</Grid>

																							<Grid item xs={2}>
																								<button
																									title="Remove"
																									type="button"
																									onClick={() => {
																										console.log(arrayHelpers);
																										arrayHelpers.remove(index);
																									}}
																									className="classSession_removeButton"
																								>
																									<BiMinus
																										size={20}
																										color={colorscheme.red2}
																									/>
                                                </button>
																							</Grid>
																						</Grid>
																					</Grid>
																				</div>
																			</>
																		)
																	)}
																<Grid
																	item
																	style={{
																		paddingBottom: "20px",
																	}}
																>
																	<button
																		type="button"
																		title="Add Other Instructor"
																		onClick={() => arrayHelpers.push()}
																		className="classSession_addInstructor"
																	>
																		Add Instructors
																	</button>
                                </Grid>
															</>
														)}
													</FieldArray>
													<Grid
														container
														direction="column"
														alignItems="center"
														justify="center"
													>
														<Grid
															item
															xs={5}
															className="classSession_groupOuter"
														>
															<CustomTextField
																name="group"
																addStyles="classSession_group"
																placeHolder="Group"
																dropdown={true}
																menuItems={user.teacher_group.map((group) => {
																	return {
																		name: `${group.group.program.name} Sem: ${group.group.sem}`,
																		value: group.group.id,
																	};
																})}
																addStyles="classSession_inputField"
															/>
														</Grid>
														<Grid item className="classSession_description">
															<CustomTextField
																name="description"
																placeHolder="Enter description"
																addStyles="classSession_inputField"
															/>
														</Grid>
														<Grid item className="classSession_upload">
															<Grid
																container
																direction="row"
																alignItems="center"
																className="classSession_uploadIconContainer"
																onClick={handleUploadOpen}
															>
																<BsFilePlus className="classSession_uploadIcon" />
																<p className="classSession_uploadIconText">
																	Upload Files
																</p>
															</Grid>

															<p className="classSession_uploadFileListContainer">
																{selectFile.length != 0
																	? selectFile.map((file, index) => (
																			<Grid
																				container
																				direction="row"
																				className="classSession_uploadFileListInside"
																				alignItems="center"
																				key={index}
																			>
																				<ResourceIcons
																					iconType={getFileType(file.type)}
																				/>
																				<p className="classSession_uploadItems">
																					{file.name}
																				</p>
																				<ImCross
																					className="classSession_uploadCross"
																					size={15}
																					color={colorscheme.red4}
																					onClick={(index) => {
																						onDeleteUploadItem(index);
																					}}
																				/>
																			</Grid>
																	  ))
																	: "No Files Added"}
															</p>
															<DropzoneDialog
																open={uploadPopUp}
																maxFileSize={10000000}
																onSave={handleUploadSave}
																acceptedFiles={[
																	"application/msword",
																	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
																	"image/jpeg",
																	"image/png",
																	"application/pdf",
																	"application/vnd.ms-powerpoint",
																	"application/vnd.openxmlformats-officedocument.presentationml.presentation",
																	"application/vnd.rar",
																	"application/x-tar",
																	"application/zip",
																	"application/x-7z-compressed",
																	"application/x-zip-compressed",
																]}
																showPreviews={true}
																onClose={handleUploadClose}
															/>
														</Grid>
													</Grid>

													<Grid item>
														<Button
															name="Submit"
															type="submit"
                              addStyles="classSession_submit"
														/>
													</Grid>
												</Grid>
											</Grid>
										</Form>
									</>
								)}
							</Formik>
						</Grid>
					</Grid>
				</ConditionalRendering>
				<ConditionalRendering condition={pageState == 2}>
					<h1>Class session has been successfully created!</h1>
				</ConditionalRendering>
			</DashboardLayout>
		</>
	);
};

export default ClassSessionCreator;
