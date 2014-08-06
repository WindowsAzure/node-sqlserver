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

var versionMap = [
    [ /^0\.6\./, '0.6' ],
    [ /^0\.8\./, '0.8' ],
    [ /^0\.10\./, '0.10' ]
];

function determineVersion() {
    for (var i in versionMap) {
        if (process.versions.node.match(versionMap[i][0])) {
            return versionMap[i][1];
        }
    }

    throw new Error('The module has not been pre-compiled for node.js version ' + process.version + '.');
}

if (process.platform !== 'win32') {
    throw new Error('This module is currently only supported on Windows.');
}

// Remove this check once pre-combiled builds of sqlserver.node targetting x64 are included.
if (process.arch !== 'ia32') {
	throw new Error('This module is only pre-compiled for x86 builds of node.js. For x64 support, build this module from source and drop the sqlserver.node file into \\native\\win32\\x64\\<major-node-version>\\');
}

module.exports = require('./native/' + process.platform + '/' + process.arch + '/' + determineVersion() + '/sqlserver.node');