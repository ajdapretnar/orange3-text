import unittest
from unittest.mock import patch

from orangecontrib.text.widgets.ownyt import OWNYT
from orangecontrib.text.widgets.utils import CheckListLayout
from orangewidget.tests.base import WidgetTest


class TestOWNYT(WidgetTest):
    def setUp(self) -> None:
        with patch("orangecontrib.text.widgets.ownyt.OWNYT.APICredentialsDialog"):
            self.widget = self.create_widget(OWNYT)


    def test_text_includes_gui(self):
        """Check that Text includes section has all controls"""
        # fmt: off
        exp_controls = [
            "Headline", "Abstract", "Snippet", "Lead Paragraph", "Subject Keywords",
            "URL", "Locations", "Persons", "Organizations", "Creative Works"
        ]
        # fmt: on
        self.assertListEqual(exp_controls, self.widget.attributes)
        self.assertListEqual(
            exp_controls, self.widget.controlArea.findChild(CheckListLayout).items
        )


if __name__ == "__main__":
    unittest.main()
