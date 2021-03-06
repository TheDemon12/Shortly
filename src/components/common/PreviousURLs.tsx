import * as React from 'react';
import styled from 'styled-components';
import { Button } from './styledComponents';

export interface PreviousURLsProps {
	previousUrls: {
		originalURL: string;
		shortURL: string;
	};
}

const PreviousUrls = styled.div`
	display: flex;
	padding: 1rem;
	justify-content: space-between;
	background-color: white;
	color: #232127;
	font-size: 1rem;
	border-radius: 8px;
	margin-bottom: 1rem;
	align-items: center;

	@media (max-width: 700px) {
		flex-direction: column;
		text-align: left;
		align-items: flex-start;
	}
`;
const HorizontalRow = styled.div`
	background-color: #ededed;
	display: none;
	width: calc(100% + 2rem);
	height: 1px;
	@media (max-width: 700px) {
		display: block;
	}
	margin: 1rem -1rem;
`;
const OriginalUrl = styled.span`
	width: 45%;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;

	@media (max-width: 700px) {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100%;
	}
`;
const ShortenUrlWrapper = styled.div`
	display: flex;
	cursor: pointer;
	align-items: center;
	justify-content: space-between;

	@media (max-width: 700px) {
		width: 100%;
		flex-direction: column;
		align-items: stretch;
	}
`;
const ShortenUrl = styled.span`
	color: #2acfcf;

	@media (max-width: 700px) {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100%;
	}
`;

const CopyUrlButton = styled(Button)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	padding: 0.5rem 1.5rem;
	border-radius: 6px;
	margin-left: 1rem;

	width: 4rem;

	&.copied {
		background-color: #3a3053;
	}

	@media (max-width: 700px) {
		margin-left: 0;
		margin-top: 1rem;
		width: calc(100% - 3rem);
		padding: 0.8rem 1.5rem;
	}
`;

const PreviousURLs: React.FC<PreviousURLsProps> = props => {
	const [isCopied, setIsCopied] = React.useState(false);
	return (
		<PreviousUrls>
			<OriginalUrl>{props.previousUrls.originalURL}</OriginalUrl>
			<HorizontalRow />
			<ShortenUrlWrapper>
				<ShortenUrl
					onClick={e => {
						e.stopPropagation();
						window.open(props.previousUrls.shortURL, '_blank');
					}}>
					{props.previousUrls.shortURL}
				</ShortenUrl>
				<CopyUrlButton
					onClick={e => {
						e.stopPropagation();
						navigator.clipboard.writeText(props.previousUrls.shortURL);
						setIsCopied(true);

						setTimeout(() => setIsCopied(false), 1000);
					}}
					className={isCopied ? 'copied' : ''}>
					{isCopied ? 'Copied!' : 'Copy'}
				</CopyUrlButton>
			</ShortenUrlWrapper>
		</PreviousUrls>
	);
};

export default PreviousURLs;
