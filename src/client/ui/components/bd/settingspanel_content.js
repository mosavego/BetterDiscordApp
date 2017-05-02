/**
 * BetterDiscord SettingsPanel Content Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

const { React, $ } = require('../../../vendor');
const { Settings } = require('../../../modules');
import { Component } from 'React';

import { CTabBarSeparator, CTabBarHeader, CTabBarItem } from '../tabbar';

import { CContentColumn, CScroller, CSettingsPanel, CSwitch } from '../';

class CSP_Content extends Component {

    constructor(props) { 
		super(props); 
		let self = this;
		self.setInitialState();
		self.bindings();
	}

	setInitialState() {
		this.state = {
			'selectedPanel': 'core'
		};
	}

	bindings() {
		let self = this;
		self.changeTab = self.changeTab.bind(self);
		self.onChange = self.onChange.bind(self);
	}

	componentDidMount() {
		window.woo = Settings;
	}

	changeTab(id) {
		if(id === 'csseditor') return;
		let self = this;
		self.setState({
			'selectedPanel': id
		});
	}

    render() {
		let self = this;
		let { selectedPanel } = self.state;

		switch(selectedPanel) {
			case 'core':
				return self.renderCorePanel;
			case 'emotes':
				return self.renderEmotesPanel;
			case 'ui':
				return self.renderUiPanel;
			case 'plugins':
				return self.renderPluginsPanel;
			case 'themes':
				return self.renderThemesPanel;
		}
    }

	onChange(cat, id, checked) {
		switch(cat) {
			case "core":
				Settings.setCoreSetting(id, checked);
			break;
			case "emotes":
				Settings.setEmoteSetting(id, checked);
			break;
			case "ui":
				Settings.setUiSetting(id, checked);
			break;
		}
	}

	get renderCorePanel() {
		return <CScroller fade={true} dark={true} children={<CSettingsPanel title="Core Settings" settings={Settings.getCoreSettings} onChange={(id, checked) => this.onChange("core", id, checked)}/>}/>;
	}
	get renderEmotesPanel() {
		return <CScroller fade={true} dark={true} children={<CSettingsPanel title="Emote Settings" settings={Settings.getEmoteSettings} onChange={(id, checked) => this.onChange("emotes", id, checked)}/>}/>;
	}
	get renderUiPanel() {
		return <CScroller fade={true} dark={true} children={<CSettingsPanel title="UI Settings" settings={Settings.getUiSettings} onChange={(id, checked) => this.onChange("ui", id, checked)}/>}/>;
	}
	get renderPluginsPanel() {
		return <span>Plugins</span>;
	}
	get renderThemesPanel() {
		return <span>Themes</span>;
	}
}

export default CSP_Content;