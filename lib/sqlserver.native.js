//---------------------------------------------------------------------------------------------------------------------------------
// File: sqlserver.native.js
// Contents: javascript which loads the native part of the Microsoft Driver for Node.js for SQL Server
// 
// Copyright Microsoft Corporation and contributors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//
// You may obtain a copy of the License at:
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//---------------------------------------------------------------------------------------------------------------------------------

try {
	console.log('loading node-sqlserver modules ...');
    module.exports = require('./sqlserver.node');   
	console.log('sqlserver.node loaded');
}
catch (e) {
	try {
		module.exports = require('./precompiled/0.8/x64/sqlserver.node');
		console.log('sqlserver for node 0.8 x64 loaded');
	} catch(e) {
		try {
			module.exports = require('./precompiled/0.8/x86/sqlserver.node');
			console.log('sqlserver for node 0.8 x86 loaded');
		} catch(e) {
			try {
				module.exports = require('./precompiled/0.6/x64/sqlserver.node');
				console.log('sqlserver for node 0.6 x64 loaded');
			} catch(e) {
				try {
					module.exports = require('./precompiled/0.6/x86/sqlserver.node');
					console.log('sqlserver for node 0.6 x86 loaded');
				} catch(e) {
					console.log('all node-sqlserver modules fails to load');
				}
			}
		}
	}
}