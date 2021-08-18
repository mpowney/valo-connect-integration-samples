import * as React from "react";
import styles from "./ServiceNowTableHelper.module.scss";
import { ConnectWidgetSize } from "@valo/extensibility/lib/models/connectWidget/ConnectWidgetInfo";
import { Button, Input, Flex, Loader, Datepicker, TableRowProps, ShorthandValue, BoxProps, MenuButton, MoreIcon, Image } from "@fluentui/react-northstar";
import { AddIcon, AcceptIcon, CloseIcon, CircleIcon, CalendarIcon } from "@fluentui/react-icons-northstar";
import { ActionButton } from "office-ui-fabric-react";
import * as moment from "moment";
import * as strings from "ConnectMeServiceNowApplicationCustomizerStrings";
import { IServiceNowTask } from "../../../services/ServiceNowService";

export class ServiceNowTableHelper {

    public static shouldAddDetailsColumns = (widgetSize: ConnectWidgetSize) => {
		return widgetSize === ConnectWidgetSize.Double || widgetSize === ConnectWidgetSize.Triple || widgetSize === ConnectWidgetSize.Box;
	};

    public static getHeaderColumns = (widgetSize: ConnectWidgetSize) => {
		let result: {
			className?: string;
			content: any;
			key: string;
			"aria-label"?: string;
		}[] = [
			{
				content: strings.IncidentNumber,
				key: "IncidentNumber",
                className: `${styles.numberColumn}`,
			},
		];
		if (ServiceNowTableHelper.shouldAddDetailsColumns(widgetSize)) {
			result.push({
				key: `ShortDescription`,
				className: styles.shortDescriptionColumn,
				content: strings.IncidentSummary
			});
		}
        result.push({
            content: strings.LastUpdate,
            className: styles.lastUpdateColumn,
            key: "LastUpdate",
        });
        result.push({
			className: `${styles.optionsColumn}`,
			content: "",
			key: "options",
			"aria-label": strings.Options,
		});
		return result;
	};

	public static getTaskRow = (task: IServiceNowTask, widgetSize: ConnectWidgetSize) => {
		let taskRow: {
            key: string,
            className: string,
            content: ShorthandValue<BoxProps>
        }[] = [
			{
				key: `${task.sys_id}-0`,
				content: task.number,
				className: `${styles.numberColumn}`,
			},
		];
		if (ServiceNowTableHelper.shouldAddDetailsColumns(widgetSize)) {
			taskRow.push({
				key: `${task.sys_id}-1`,
				className: styles.shortDescriptionColumn,
				content: task.short_description
			});
		}
        taskRow.push({
            key: `${task.sys_id}-2`,
            className: styles.lastUpdateColumn,
            content: moment(task.sys_updated_on).format("lll")
        });
        taskRow.push({
			key: `${task.sys_id}-3`,
			className: `${styles.optionsColumn}`,
			content: (<MenuButton
                trigger={
                    <Button
                        className={styles.uiButton}
                        icon={<MoreIcon size="medium" />}
                        circular
                        text
                        iconOnly
                        title={strings.Options}
                    />
                }
                menu={[{ 
                    icon: <Image src={require('./assets/snow-logo.png')} width={24} height={24}/>,
                    content: strings.OpenInServiceNow
                }]}
                positionFixed={true}
                on="click"
            />),
		});
		return taskRow;
	};


}
